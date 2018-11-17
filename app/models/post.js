import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  imgUrl: DS.attr('string'),
  imgAlt: DS.attr('string'),
  imgCaption: DS.attr('string'),
  category: DS.attr('string'),
  readingTime: DS.attr('string'),
  timestamp: DS.attr('date'),
  uid: DS.attr('string'),
  comments: DS.hasMany('comment', { async: true, inverse: null }),
  user: DS.belongsTo('user', { async: true, inverse: null }),
});
