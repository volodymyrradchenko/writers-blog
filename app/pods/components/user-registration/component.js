import Component from '@ember/component';
import { registerUser } from 'writers-blog/tasks';
import { PropTypes } from 'ember-prop-types';

export default Component.extend({
  propTypes: {
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    error: PropTypes.string,
    registerUser: PropTypes.EmberObject.isRequired,
  },
    registerUser
});
