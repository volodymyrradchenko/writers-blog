import Component from '@ember/component';
import { inject as service } from "@ember/service";
import { get } from "@ember/object";

export default Component.extend({
  store: service(),
  session: service(),

  async replyComment(replyMessage) {
    const newComment = this.get('store').createRecord('comment', {
      uid: this.get('session.currentUser.uid'),
      body: replyMessage
    })

    const currentComment = this.get('comment')

    try {
      await newComment.save()

      get(currentComment, 'comments').pushObject(newComment)

      await currentComment.save()

      this.set('showForm', false)
      this.set('replyMessage', '')
    } catch(e) {
      console.log(e)
    }
  }
});
