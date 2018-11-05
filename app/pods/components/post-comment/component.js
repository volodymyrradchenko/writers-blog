import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Component.extend({
  store: service(),
  session: service(),

  tagName: '',
  showForm: false,

  toggleForm() {
    this.toggleProperty('showForm');
  },

  async replyComment(replyMessage) {

    const newComment = get(this, 'store').createRecord('comment', {
      uid: get(this, 'session.currentUser.uid'),
      body: replyMessage
    });

    const currentComment = get(this, 'comment');

    try {
      await newComment.save();

      get(currentComment, 'comments').pushObject(newComment);

      await currentComment.save();
// TODO: fix toggle off after comment is saved
      set(this, 'replyMessage', '');
      set(this, 'showForm', false);

    } catch(e) {
      console.log(e)
    }
  }
});
