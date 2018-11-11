import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';


export default Component.extend({
  propTypes: {
    socialsClass: PropTypes.string.isRequired,
  },
  classNames: ['hoc-form__social-wrapper'],
  classNameBindings: ['socialsClass'],
  socialsClass: null,
});
