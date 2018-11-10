import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';
// import { PropTypes } from 'ember-prop-types';

export default task({
  // propTypes: {
  //   commentMessage: PropTypes.string,
  //   showForm: PropTypes.bool
  // },
  session: service(),

  *perform() {
    try {
      yield get(this, 'session').close()
    } catch (error) {
      console.log(get(error, 'message'));
    }
  }
})
