import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Route.extend({
  store: service(),
  session: service(),

  model( { post_id } = {} ) {
      return this.store.findRecord('post', post_id);
  },

  actions: {
    async saveComment(commentMessage = '') {
      let currentPost = this.modelFor('posts.post');

      let newComment = this.store.createRecord('comment', {
        uid: get(this, 'session.currentUser.uid'),
        body: commentMessage
      });

      get(currentPost, 'comments').pushObject(newComment);

      try {
        await newComment.save();
        await currentPost.save();
      } catch(e) {
        console.log(e)
      }

      // reset commentMessage after saving it
      set(this.controllerFor('posts.post'), 'commentMessage', '');

      this.refresh();
    }
  }
});
