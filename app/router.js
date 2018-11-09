import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('posts', function() {
    this.route('post', { path: '/:post_id'});
    this.route('new');
    this.route('edit', { path: '/:post_id/edit' });
  });
  this.route('about');
  this.route('sign-in');
  this.route('sign-up');
});

export default Router;
