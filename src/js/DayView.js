define('DayView', ['backbone', 'handlebars', 'EventView', 'underscore'], function (Backbone, Handlebars, EventView, _) {
  return Backbone.View.extend({

    tagName: 'li',
    className: 'day',
    template: Handlebars.templates['day'],

    initialize: function () {
      _.bindAll(this, 'toggleExpand', 'render');
      this.collection.on('change', this.toggleExpand)
    },

    toggleExpand: function () {
      this.$el.toggleClass('expanded', !this.collection.isEmpty());
    },

    renderEvent: function (model) {
      return new EventView({model: model}).render().el;
    },

    render: function () {
      this.toggleExpand();
      this.$el
        .html(this.template({title: 'четверг'}))// todo: display dates on next week
        .find('.children')
        .html(this.collection.map(this.renderEvent));
      return this;
    }
  });
});