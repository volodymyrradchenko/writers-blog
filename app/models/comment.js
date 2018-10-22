import DS from 'ember-data';

export default DS.Model.extend({
  body: DS.attr('string'),
  owner: DS.belongsTo('user'),
  post: DS.belongsTo('post'),
  comments: DS.belongsTo('comment')
});
