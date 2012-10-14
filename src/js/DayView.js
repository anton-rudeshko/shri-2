define('DayView', ['backbone', 'handlebars', 'EventView', 'Common', 'templates'], function (Backbone, Handlebars, EventView, Common) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'day',
    template: Handlebars.templates['day'],

    events: {
      'click .day__add-event': 'addNewDay'
    },

    initialize: function () {
      this.model.events.on('add', this.renderNewDay, this);
      this.model.events.on('add remove', this.checkNeedExpand, this);
      this.model.events.on('reset', this.render, this);
    },

    checkNeedExpand: function () {
      var notEmpty = !this.model.events.isEmpty(),
        titleWidth = this.$('.day__title').width(),
        eventsHeight = this.$('.day__events').height();

      this.$el.toggleClass('expanded', notEmpty && titleWidth <= eventsHeight);
    },

    renderEvent: function (eventModel) {
      return new EventView({model: eventModel}).render().el;
    },

    prepareModel: function () {
      var model = this.model.toJSON();
      model.isToday = Common.isToday(model.date);
      model.title = Common.formatDayTitle(model.date);
      return model;
    },

    render: function () {
      this.$el
        .html(this.template(this.prepareModel()))
        .find('.children')
        .html(this.model.events.map(this.renderEvent));

      this.checkNeedExpand();

      return this;
    },

    renderNewDay: function (model) {
      this.$el.find('.children').append(this.renderEvent(model));
      this.checkNeedExpand();
    },

    addNewDay: function () {
      this.model.addEmptyEvent();
    }
  });
});