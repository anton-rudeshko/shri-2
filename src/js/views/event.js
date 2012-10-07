define("views/event", ["backbone"], function (Backbone) {
  /**
   * EventView
   */
  return Backbone.View.extend({
    initialize: function () {
      this.model.on('error', function (model, error) {
        alert('model error: ' + error)
      });
    },

    render: function () {
      this.$el.append('<div>Title: ' + this.model.get('title') + ', lecturer: ' + this.model.get('lecturer') + '</div>');
      return this;
    }
  });
});