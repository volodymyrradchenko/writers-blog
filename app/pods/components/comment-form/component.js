import Component from '@ember/component';
import { PropTypes } from 'ember-prop-types';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
// import { saveComment } from 'writers-blog/tasks';

export default Component.extend({
  propTypes: {
    commentMessage: PropTypes.string,
    showForm: PropTypes.bool,
    saveComment: PropTypes.EmberObject.isRequired,
    comment: PropTypes.EmberObject.isRequired
  },
  store: service(),
  session: service(),

  classNames: 'comment-form__wrapper',

// TODO: find a way to move saveComment to the 'tasks' folder
  saveComment: task(function * (commentMessage = '') {
      try {

        let newComment = get(this, 'store').createRecord('comment', {
          uid: get(this, 'session.currentUser.uid'),
          body: commentMessage,
        });

        let currentParent = get(this, 'comment');

        get(currentParent, 'comments').pushObject(newComment);

        yield newComment.save();
        yield currentParent.save();
      } catch (err) {
        console.log(get(err, 'message'));
      } finally {
        set(this, 'commentMessage', '');
        // TODO: make a wrapper component instead of passing showForm to post-comment component
        set(this, 'showForm', false);
      }
    }
  )
});
