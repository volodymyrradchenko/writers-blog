import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { debug } from '@ember/debug';
import { get } from '@ember/object';


export default Component.extend({
  // TODO: move updatePost to tasks folder
  updatePost: task(function* () {
    try {
      let post = get(this, 'model');
      yield post.save();
    } catch(error) {
      debug('---post-edit' + error)
    }
  })
});
