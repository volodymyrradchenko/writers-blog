import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

export default task({
  store: service(),
  session: service(),

  *perform(title, body, imgUrl, imgAlt, imgCaption, category) {
    try {

      let newPost = get(this, 'store').createRecord('post', {
        title: title,
        body: body,
        imgUrl: imgUrl,
        imgAlt: imgAlt,
        imgCaption: imgCaption,
        category: category,
        uid: get(this, 'session.currentUser.uid'),
      });

      yield newPost.save();
    } catch (err) {
      console.log(get(err, 'message'));
    }
  }
})
