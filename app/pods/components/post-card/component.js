import Component from '@ember/component';
// import { task } from 'ember-concurrency';
// import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';
import { deletePost } from 'writers-blog/tasks';

export default Component.extend({
  tagName: 'article',
  classNames: ['post-card__item'],

  session: service(),

  deletePost,
});
