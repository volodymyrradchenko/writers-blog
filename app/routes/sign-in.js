import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  email: '',
  password: '',

  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },

  actions: {
    signIn: function(provider, email, password) {
      this.get('session')
        .open('firebase',
          { provider: provider, email: email, password: password })
        .then(function(data) {
          console.log(data);
        });
    },
    signOut: function() {
      this.get('session').close();
    },
  },
});
