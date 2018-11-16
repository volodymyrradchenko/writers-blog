import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { debug } from '@ember/debug';

export default Component.extend({
  tagName: 'article',
  classNames: ['post-card__item', 'infinite-scroll__item'],
  // TODO add dateTime, dateTimeShow and readingTime calculations
  dateTime: computed(function() {
    let timestamp = this.model.get('timestamp');
    if (timestamp) {
      return this.model.get('timestamp');
    }
    return;
  }),
  dateTimeShow: computed(function() {
    let timestamp = this.model.get('timestamp');
    if (timestamp) {
      return this.model.get('timestamp').toLocaleTimeString();
    }
    return;
  }),
  readingTime: '7 minutes read',
  // TODO: move deletePost to tasks folder
  deletePost: task(function*(post){
    try {
      yield post.destroyRecord();
    } catch (error) {
      debug('---post-card', error);
    }
  })
});
