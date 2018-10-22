import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  // TODO add dateTime, dateTimeShow and readingTime calculations
  dateTime: '',
  dateTimeShow: computed(function() {
    return this.get('title');
  }),
  readingTime: ''
});
