define('DayView', ['backbone', 'handlebars', 'EventView', 'templates'], function (Backbone, Handlebars, EventView) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'day',
    template: Handlebars.templates['day'],

    events: {
      'click .day__add-event': 'addNewDay'
    },

    initialize: function () {
      this.model.bind('change:empty', this.toggleExpand, this);
      this.model.events.on('add', this.renderNewDay, this);
      this.model.events.on('reset', this.render, this);
    },

    toggleExpand: function () {
      var notEmpty = !this.model.get('empty');
      var titleWidth = this.$('.day__title').width();
      var eventsHeight = this.$('.day__events').height();
      this.$el.toggleClass('expanded', notEmpty && titleWidth <= eventsHeight);
    },

    renderEvent: function (eventModel) {
      return new EventView({model: eventModel}).render().el;
    },

    render: function () {
      this.$el
        .html(this.template(this.model.toJSON()))
        .find('.children')
        .html(this.model.events.map(this.renderEvent));

      this.toggleExpand();

      return this;
    },

    renderNewDay: function (model) {
      this.$el.find('.children').append(this.renderEvent(model));
      this.toggleExpand();
    },

    addNewDay: function () {
      this.model.addEmpty();
    }
  });
});