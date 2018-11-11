import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default task({
  session: service(),

  *perform() {
    try {
      yield get(this, 'session').close()
    } catch (error) {
      console.log(get(error, 'message'));
    }
  }
})
