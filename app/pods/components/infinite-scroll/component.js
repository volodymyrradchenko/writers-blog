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

      let limitToFirst = get(this, 'modelsToShow');
      let incrementModels = get(this, 'modelsPerLoad');

      // TODO: add desc filtering by date added
      let options = {
        limitToFirst,
      }

      let models = get(this, 'models') || '';

      // result gets desired firebase query and adds it to the store without reloading it
      let result = yield store.query(modelName, options).then(data => {
        // comparing response query to existing query
        if (data.length == models.length) {
          set(this, 'isLoadedAll', true);
        } else {
          set(this, 'models', data);
        }
        console.log(get(this, 'isLoadedAll'))
      });
      // increment the queery request
      yield set(this, 'modelsToShow', limitToFirst + incrementModels);
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
