define('views/shri', ['backbone', 'views/events'], function (Backbone, EventCollectionView) {
  /**
   * ShriView
   */
  return Backbone.View.extend({
    initialize: function () {
      this.eventsView = new EventCollectionView({collection: this.model.events});
    },

    render: function () {
      this.$el.html(this.eventsView.render().el);
      return this;
    }
  });
});
