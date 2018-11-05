import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Component.extend({
  store: service(),
  session: service(),

  tagName: '',

  async saveComment(commentMessage = '') {
    let newComment = this.store.createRecord('comment', {
      uid: get(this, 'session.currentUser.uid'),
      body: commentMessage
    });

    let currentParent = this.comment;
    get(currentParent, 'comments').pushObject(newComment);

    try {
      await newComment.save();
      await currentParent.save();

      set(this, 'showForm', false);
      set(this, 'commentMessage', '')
    } catch (e) {
      console.log(e)
    }
  }
});
