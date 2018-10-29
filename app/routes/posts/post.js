import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

import RSVP from 'rsvp';

export default Route.extend({
  store: service(),
  session: service(),

  model( { post_id } = {} ) {
    return RSVP.hash({
      post: this.store.findRecord('post', post_id),
    });
  },

  actions: {
    async saveComment(commmentMessage = '') {
      let currentPost = this.get('currentModel.post');

      const newComment = this.store.createRecord('comment', {
        uid: this.session.get('currentUser.uid'),
        body: commmentMessage
      })

      currentPost.get('comments').pushObject(newComment);

      try {
        await newComment.save()
        await currentPost.save()
      } catch(e) {
        console.log(e)
      }

      this.controllerFor('posts.post').set('commmentMessage', '')

      this.refresh()
    }
  }
});
