import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('post');
  },

  actions: {
    savePost(newPost) {
      console.log('---', this.get('session.currentUser.uid'));
      console.log('---', this.get('title'));
      console.log('---', this.get('store'));

      const currentUserId = this.get('session.currentUser.uid');
      const post = this.get('store').createRecord('post', {
        title: newPost.title,
        body: newPost.body,
        imgUrl: newPost.imgUrl,
        imgAlt: newPost.imgAlt,
        imgCaption: newPost.imgCaption,
        category: newPost.category,
        uid: currentUserId,
      });

      post.save().then(() => this.get('store').unloadAll());
      // console.log('---', newPost.get('title'));
      // newPost.save().then(() => this.transitionTo('posts'))
    }
  }
});
