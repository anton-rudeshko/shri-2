define('models/shri', ['backbone', 'collections/events', 'views/events'], function (Backbone, EventCollection, EventCollectionView) {
  /**
   * ShriModel
   */
  return Backbone.Model.extend({
    initialize: function (data) {
      this.data = data || [];
      this.events = new EventCollection(data);
    }
  });
});