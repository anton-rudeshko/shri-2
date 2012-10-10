define('ShriView', ['backbone', 'EventCollectionView'], function (Backbone, EventCollectionView) {
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
