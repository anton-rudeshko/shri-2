define('EventCollectionView', ['backbone', 'EventView'], function (Backbone, EventView) {
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
