import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

import firebase from 'firebase';

export default task({
  store: service(),
  session: service(),

  *perform(provider = '', email = '', password = '') {
    try {

      let isNewUser = yield (firebase_response = {}) => {
        return new Promise(resolve => {
          firebase.database().ref('users').orderByChild('uid').equalTo(firebase_response.currentUser.uid).on('value', snapshot => {
            if (snapshot.val() === null) {
              resolve(firebase_response)
            }
          })
        })
      }


      if (provider === 'password') {
        yield get(this, 'session').open('firebase', {
          provider: provider,
          email: email,
          password: password,
        }).then((response) => console.log(response.currentUser));

      } else if (provider === 'twitter' ||
                 provider === 'google' ||
                 provider === 'facebook') {
        yield get(this, 'session').open('firebase', {
          provider: provider,
        }).then((response) => {

          isNewUser(response).then(response => {

            get(this, 'store').createRecord('user', {
              uid: get(response, 'currentUser.uid'),
              email: get(response, 'currentUser.email'),
              name: get(response, 'currentUser.displayName'),
              avatar: get(response, 'currentUser.photoURL')
            }).save()

          }).catch(error => console.log(get(error)))
        });
      }

    } catch (error) {
      console.log(get(error, 'message'));
    }
  }
})
