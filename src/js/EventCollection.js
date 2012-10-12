define('EventCollection', ['backbone', 'EventModel'], function (Backbone, EventModel) {
  var EventCollection = Backbone.Collection.extend({
    model: EventModel
  });
  return EventCollection;
});