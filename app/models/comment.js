import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  uid: DS.attr('string'),
  post: DS.belongsTo('post', { async: true, inverse: null }),
  comments: DS.hasMany('comment', { async: true, inverse: null }),
});
