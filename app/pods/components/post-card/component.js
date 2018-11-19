import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { debug } from '@ember/debug';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'article',
  classNames: ['post-card__item'],

  session: service(),

  deletePost: task(function*(post){
    try {
      yield post.destroyRecord();
    } catch (error) {
      debug('---post-card', error);
    }
  })
});
