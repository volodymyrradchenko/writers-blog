import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';

export default task({
  store: service(),
  session: service(),

  *perform(commentMessage = {}) {
    try {

      let newComment = get(this, 'store').createRecord('comment', {
        uid: get(this, 'session.currentUser.uid'),
        body: commentMessage,
      });


      let currentParent = get(this, 'comment');

      get(currentParent, 'comments').pushObject(newComment);

      yield newComment.save();
      yield currentParent.save();
    } catch (error) {
      set(this, 'error', 'Password does not match the confirm password.')
    } finally {
      set(this, 'commentMessage', '');
      // TODO: make a wrapper component instead of passing showForm to post-comment component
      set(this, 'showForm', false);
    }
  }
})
