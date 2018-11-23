// import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { task } from 'ember-concurrency';

// import firebase from 'firebase';

export default task({
  // session: service(),
  // store: service(),

  * perform(post) {
    try {
      // let getUserKey = function (user_uid) {
      //   return new Promise(resolve => {
      //     firebase.database().ref('users').orderByChild('uid').equalTo(user_uid).on('value', snapshot => {
      //       resolve(Object.keys(snapshot.val())[0]);
      //     })
      //   })
      // };

      // let userKey = yield getUserKey(post.uid);
      // let parentUser = yield get(this, 'store').findRecord('user', userKey);

      let parentUser = post.get('user');
      // TODO: destroyRecord won't update parent
      yield post.destroyRecord().then(() => parentUser.save())
      // yield parentUser.save();
      // yield parentUser.get('posts').removeObject(post);

      // yield post.destroyRecord();
      // yield parentUser.save();

    } catch (error) {
      console.log(get(error, 'message'));
    }
  }
})
