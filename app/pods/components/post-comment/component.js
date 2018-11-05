import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  session: service(),

  tagName: '',
  showForm: false,

  toggleForm() {
    this.toggleProperty('showForm');
  }

});
