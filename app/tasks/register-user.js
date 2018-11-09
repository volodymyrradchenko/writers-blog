import { inject as service } from '@ember/service';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';
// import { PropTypes } from 'ember-prop-types';

export default task({
  // propTypes: {
  // },

  store: service(),
  session: service(),
  router: service(),
  firebaseApp: service(),

  *perform(
    name = '',
    email = '',
    password = '',
    confirmPassword = ''
  ) {
    try {

      let isValid = computed(function () {
        return password === confirmPassword;
      })

      let authenticate = get(this, 'firebaseApp').auth();

      if (isValid) {
        yield authenticate.createUserWithEmailAndPassword(email, password)
          .then((response) => {
            get(this, 'store').createRecord('user', {
              uid: get(response, 'uid'),
              name: name,
              email: get(response, 'email'),
            }).save();
            get(this, 'session').open('firebase', {
              provider: 'password',
              email: email,
              password: password,
            })
          })
      }
    } catch (error) {
      set(this, 'error', 'Password does not match the confirm password.')
    } finally {
      set(this, 'name', '');
      set(this, 'email', '');
      set(this, 'password', '');
      set(this, 'confirmPassword', '');
    }
  }
})