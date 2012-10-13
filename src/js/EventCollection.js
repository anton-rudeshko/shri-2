define('EventCollection', ['backbone', 'EventModel', 'backbone.localstorage'], function (Backbone, EventModel) {
  return Backbone.Collection.extend({
    model: EventModel,
    localStorage: new Backbone.LocalStorage("EventCollection"),

    comparator: function (model) {
      return model.get('time').getTime();
    }
  });
});