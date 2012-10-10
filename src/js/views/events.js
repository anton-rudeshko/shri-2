define('views/events', ['backbone', 'views/event'], function (Backbone, EventView) {
  /**
   * EventsCollectionView
   */
  return Backbone.View.extend({
    render: function () {
      var html = this.collection.reduce(function (html, item) {
        return html + new EventView({model: item}).render().$el.html();
      }, "");
      this.$el.html(html);
      return this;
    }
  });
});
