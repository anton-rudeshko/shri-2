define('ScheduleView', ['backbone', 'handlebars', 'DayView', 'templates'], function (Backbone, Handlebars, DayView) {
  return Backbone.View.extend({
    className: 'schedule',
    template: Handlebars.templates['schedule'],

    events: {
      'click .schedule__start-again__button': 'startAgain',
      'click .schedule__print__button'      : 'print',
      'click .schedule__load-2012__button'  : 'load2012',
      'click .schedule__add-day'            : 'addDay'
    },

    initialize: function () {
      var days = this.model.daysCollection;
      days.on('add', this.renderNewDay, this);
    },

    renderDay: function (model) {
      return new DayView({model: model}).render().el;
    },

    render: function () {
      var els = this.model.daysCollection.map(this.renderDay);
      this.$el.html(this.template()).find('.schedule__days').html(els);
      return this;
    },

    startAgain: function () {
      toastr.info('Начинаем сначала');
      window.localStorage.clear();
      this.model.initFromJson([]);
      this.render();
      return false;
    },

    print: function () {
      window.print();
      return false;
    },

    load2012: function () {
      toastr.info('Загружаем лекции 2012');
      window.localStorage.clear();
      this.model.fetch();
      this.render();
      return false;
    },

    renderNewDay: function (model) {
      this.$el.find('.schedule__days').append(this.renderDay(model));
    },

    addDay: function () {
      this.model.addNewDay();
    }
  });
});
