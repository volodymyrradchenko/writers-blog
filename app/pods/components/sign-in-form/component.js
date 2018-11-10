import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { signIn, signOut } from 'writers-blog/tasks';

export default Component.extend({
  session: service(),

  email: 'blabla@bla.bla',
  password: 'blabla',
  provider: 'password',

  signIn,
  signOut,
});
