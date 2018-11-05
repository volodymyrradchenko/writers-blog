import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { task } from 'ember-concurrency';
import { PropTypes } from 'ember-prop-types';

export default Component.extend({
  propTypes: {
    commentMessage: PropTypes.string,
    showForm: PropTypes.bool
  },

  store: service(),
  session: service(),

  tagName: '',

  saveComment: task(function * (commentMessage = {}) {
    try {

    let newComment = get(this, 'store').createRecord('comment', {
      uid: get(this, 'session.currentUser.uid'),
      body: commentMessage,
    })

    let currentParent = this.comment;

    get(currentParent, 'comments').pushObject(newComment);

    yield newComment.save();
    yield currentParent.save();
  } catch (err) {
    console.log(err)
  } finally {
    set(this, 'commentMessage', '');
    // TODO: make a wrapper component instead of passing showForm to post-comment component
    set(this, 'showForm', false);
  }
  }),
});
