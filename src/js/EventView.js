define('EventView', ['backbone', 'handlebars'], function (Backbone, Handlebars) {
  return Backbone.View.extend({
    initialize: function () {
      this.template = Handlebars.templates['event'];
      this.model.on('error', function (model, error) {
        alert('model error: ' + error)
      });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});