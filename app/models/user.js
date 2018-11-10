import DS from 'ember-data';

export default DS.Model.extend({
  uid: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  avatar: DS.attr('string'),
  comments: DS.hasMany('comment', { async: true, inverse: null }),
  posts: DS.hasMany('post', { async: true, inverse: null })
});
