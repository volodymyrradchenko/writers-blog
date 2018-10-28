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
      comment: this.store.createRecord('comment')
    });
  },

  actions: {
    saveComment(newComment) {
      let currentPost = this.get('currentModel').post;
      newComment.set('uid', this.session.get('currentUser').uid);

      currentPost.get('comments').pushObject(newComment);

      newComment.save().then(function() {
        currentPost.save()
      }).then(() => this.refresh());
    }
  }
});
