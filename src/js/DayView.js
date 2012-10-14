define('DayView', ['backbone', 'handlebars', 'EventView', 'Common', 'templates'], function (Backbone, Handlebars, EventView, Common) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'day',
    template: Handlebars.templates['day'],

    events: {
      'click .day__add-event': 'addNewEvent',
      'click .day__remove': 'removeDay'
    },

    initialize: function () {
      var events = this.getEvents();

      events.on('add', this.renderNewEvent, this);
      events.on('add remove', this.checkNeedExpand, this);
      events.on('reset', this.render, this);
    },

    getEvents: function () {
      return this.model.get('events');
    },

    checkNeedExpand: function () {
      var notEmpty = !this.getEvents().isEmpty(),
        titleWidth = this.$('.day__title').width(),
        eventsHeight = this.$('.day__events').height(),
        classSwitch = notEmpty && titleWidth <= eventsHeight;

      this.$el.toggleClass('expanded', classSwitch);
    },

    renderEvent: function (eventModel) {
      return new EventView({model: eventModel}).render().el;
    },

    prepareModel: function () {
      var model = this.model.toJSON();
      model.title = Common.formatDayTitle(model.date);
      return model;
    },

    render: function () {
      this.$el
        .html(this.template(this.prepareModel()))
        .find('.day__events-list')
        .html(this.getEvents().map(this.renderEvent));

      this.checkNeedExpand();
      this.$el.addClass(this.getDayClass());

      return this;
    },

    getDayClass: function () {
      var date = this.model.get('date');
      if (Common.isPast(date)) {
        return 'day__past';
      }
      if (Common.isToday(date)) {
        return 'day__today';
      }
      if (Common.isFuture(date)) {
        return 'day__future';
      }
    },

    renderNewEvent: function (model) {
      this.$el.find('.day__events-list').append(this.renderEvent(model));
      this.checkNeedExpand();
    },

    addNewEvent: function () {
      this.model.addEmptyEvent();
    },

    removeDay: function () {
      this.model.get('events').each(function (event) {
        event.destroy();
      });
      this.model.destroy();
    }
  });
});