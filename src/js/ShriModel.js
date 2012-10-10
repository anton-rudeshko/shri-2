define('ShriModel', ['backbone', 'EventCollection'], function (Backbone, EventCollection) {
  return Backbone.Model.extend({
    initialize: function (data) {
      this.data = data || [];
      this.events = new EventCollection(data);
    }
  });
});