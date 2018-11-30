import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { reads } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';
import { debug } from '@ember/debug';

export default Component.extend({
  classNames: ['infinite-scroll'],
  modelName: null,

  store: service(),

  modelsToShow: null,
  modelsPerLoad: null,

  models: reads('getFirebaseQuery.last.value'),
  isRunning: reads('getFirebaseQuery.last.isRunning'),

  isLoadedAll: false,

  getFirebaseQuery: task(function* (modelName = '') {
    try {
      yield timeout(500);
      let store = get(this, 'store');

      let limitToLast = get(this, 'modelsToShow');
      let incrementModels = get(this, 'modelsPerLoad');

      // TODO: add desc filtering by date added
      let options = {
        limitToLast,
      }

      let models = get(this, 'models') || '';

      // result gets desired firebase query and adds it to the store without reloading it
      let result = yield store.query(modelName, options).then(data => {
        // comparing response query to existing query
        if (data.length == models.length) {
          set(this, 'isLoadedAll', true);
        } else {
          // sort received models by timestamp
          set(this, 'models', data.sortBy('timestamp').reverse());
        }
        debug('--infinite-isLoadedAll' + ' = ' + get(this, 'isLoadedAll'))
      });
      // increment the queery request
      yield set(this, 'modelsToShow', limitToLast + incrementModels);

      return result;
    } catch (error) {
      debug('---infinite-scroll' + error)
    }
  }).drop(),

  // load models on page first page load/reload
  init() {
    this._super(...arguments);
    this.paginate()
  },


  paginate() {
    this.get('getFirebaseQuery').perform(this.get('modelName'))
  },

});
