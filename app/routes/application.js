import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Route.extend({
  session: service(),

  beforeModel() {
    return this.get('session').fetch().catch((err) => debug('---application' + err));
  }

});
