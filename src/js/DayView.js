define('DayView', ['backbone', 'underscore', 'handlebars', 'EventView'], function (Backbone, _, Handlebars, EventView) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'day',
    template: Handlebars.templates['day'],

    events: {
      'click .day__add-event': 'addNewDay'
    },

    initialize: function () {
      this.model.bind('change:empty', this.toggleExpand, this);
    },

    toggleExpand: function () {
      this.$el.toggleClass('expanded', !this.model.get('empty'));
    },

    renderEvent: function (eventModel) {
      return new EventView({model: eventModel}).render().el;
    },

    render: function () {
      this.toggleExpand();
      this.$el
        .html(this.template(this.model.toJSON()))
        .find('.children')
        .html(this.model.events.map(this.renderEvent));
      return this;
    },

    addNewDay: function () {
      this.model.addEmpty();
      // todo: only append new
      this.render();
    }
  });
});