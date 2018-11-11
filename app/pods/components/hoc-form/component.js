import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';

export default Component.extend({
  propTypes: {
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    error: PropTypes.string,
    formClass: PropTypes.string.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  },

  tagName: '',
});
