import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'article',
  classNames: ['post-card__item', 'infinite-scroll__item'],
  // TODO add dateTime, dateTimeShow and readingTime calculations
  dateTime: computed(function() {
    return this.model.get('timestamp');
  }),
  dateTimeShow: computed(function() {
    return this.model.get('timestamp').toLocaleTimeString();
  }),
  readingTime: '7 minutes read'
});
