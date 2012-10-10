define('EventCollectionView', ['backbone', 'EventView'], function (Backbone, EventView) {
  return Backbone.View.extend({
    tagName: 'ul',

    className: 'events',

    render: function () {
      var els = this.collection.map(function (model) {
        return new EventView({model: model}).render().el;
      });
      this.$el.html(els);
      return this;
    }
  });
});
