define('EventCollection', ['backbone', 'EventModel'], function (Backbone, EventModel) {
  return Backbone.Collection.extend({
    model: EventModel,

    comparator: function (model) {
      return model.get('start').getTime();
    }
  });
});