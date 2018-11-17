import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  uid: DS.attr('string'),
  timestamp: DS.attr('date'),
  email: DS.attr('string'),
  name: DS.attr('string'),
  post: DS.belongsTo('post', { async: true, inverse: null }),
  comments: DS.hasMany('comment', { async: true, inverse: null }),
  user: DS.belongsTo('user', { async: true, inverse: null }),
});
