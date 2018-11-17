import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { debug } from '@ember/debug';

import firebase from 'firebase';

export default task({
  store: service(),
  session: service(),

  * perform(
    title = '',
    body = '',
    imgUrl = '',
    imgAlt = '',
    imgCaption = '',
    category = '',
  ) {
    try {
      let getReadingTime = function(body) {
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

      let readingTime = yield getReadingTime(body);


      let newPost = get(this, 'store').createRecord('post', {
        title: title,
        body: body,
        imgUrl: imgUrl,
        imgAlt: imgAlt,
        imgCaption: imgCaption,
        category: category,
        uid: get(this, 'session.currentUser.uid'),
        readingTime: readingTime,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });

      yield newPost.save();
    } catch (error) {
      debug('---task-create-post' + error)
      set(this, 'error', 'Error: create-post task');
    }
  }
})
