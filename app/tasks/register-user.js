import { inject as service } from '@ember/service';
import { get, set, computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default task({
  store: service(),
  session: service(),
  firebaseApp: service(),

  *perform(
    name = '',
    email = '',
    password = '',
    confirmPassword = ''
  ) {
    try {

      let isPasswordValid = computed(function () {
        return password === confirmPassword;
      })

      let authenticate = get(this, 'firebaseApp').auth();

      if (isPasswordValid) {
        yield authenticate.createUserWithEmailAndPassword(email, password)
          .then(response => {

            response.updateProfile({ displayName: name });

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
