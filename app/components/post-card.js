import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'li',
  classNames: ['posts__item', 'infinite-scroll__item'],

  imgUrl: '',
  imgAlt: '',
  imgCaption: '',
  category: '',
  title: '',

  dateTime: null,
  dateTimeShow: null,
  readingTime: null,
});
