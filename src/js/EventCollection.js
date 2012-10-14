define('EventCollection', ['backbone', 'EventModel', 'backbone.localstorage'], function (Backbone, EventModel) {
  return Backbone.Collection.extend({
    model: EventModel,

    comparator: function (model) {
      return model.get('time').getTime();
    }
  });
});