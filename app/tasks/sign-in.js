import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default task({
  store: service(),
  session: service(),

  *perform(provider = '', email = '', password = '') {
    try {
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
            get(this, 'store').createRecord('user', {
              uid: get(response, 'currentUser.uid'),
              email: get(response, 'currentUser.email'),
              name: get(response, 'currentUser.displayName'),
              avatar: get(response, 'currentUser.photoURL')
            }).save()
        });
      }

    } catch (error) {
      console.log(get(error, 'message'));
    }
  }
})
