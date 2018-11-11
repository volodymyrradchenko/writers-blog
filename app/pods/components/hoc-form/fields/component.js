import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';


export default Component.extend({
  propTypes: {
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    fieldsClass: PropTypes.string.isRequired,
  },
  classNames: ['hoc-form__field-wrapper'],
  classNameBindings: ['fieldsClass'],
  fieldsClass: null,
});
