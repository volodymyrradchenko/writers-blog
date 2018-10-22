import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('post');
  },

  actions: {
    savePost(newPost) {
      newPost.save().then(() => this.transitionTo('posts'))
    }
  }
});
