import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  imgUrl: DS.attr('string'),
  imgAlt: DS.attr('string'),
  imgCaption: DS.attr('string'),
  category: DS.attr('string'),
  timestamp: DS.attr('date'),
  comments: DS.hasMany('comment'),
  user: DS.belongsTo('user')
});
