import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { debug } from '@ember/debug';
import { get, set } from '@ember/object';

import firebase from 'firebase';

export default Component.extend({
  // TODO: move updatePost to tasks folder
  updatePost: task(function* () {
    try {
      let post = get(this, 'model');

      let getReadingTime = function({body}) {
        function count(target) {
          // typecheck for input
          let original = '' + (typeof target === 'string' ? target : 0);
          // strip html tags
          original = original.replace(/<\/?[a-z][^>]*>/gi, ' ')
          // trim
          let trimmed = original.trim();
          // strip all punctuation marks and count words
          return trimmed ? (trimmed.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length : 0;
        }

        let readingSpeed = 200,
            text = body,
            words = count(text),
            minutes = words / readingSpeed;
        return Math.ceil(minutes);
      }

      let readingTime = getReadingTime(post);

      yield set(post, 'readingTime', readingTime);
      yield set(post, 'timestamp', firebase.database.ServerValue.TIMESTAMP);

      yield post.save();
    } catch(error) {
      debug('---post-edit' + error)
    }
  })
});
