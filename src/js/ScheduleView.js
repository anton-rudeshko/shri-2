define('ScheduleView', ['backbone', 'handlebars', 'underscore', 'DayView', 'templates'], function (Backbone, Handlebars, _, DayView) {
  return Backbone.View.extend({
    className: 'schedule',
    template: Handlebars.templates['schedule'],

    events: {
      'click .schedule__start-again__button': 'startAgain',
      'click .schedule__print__button'      : 'print',
      'click .schedule__load-2012__button'  : 'load2012',
      'click .schedule__add-day__button'    : 'addDay'
    },

    initialize: function () {
      var days = this.model.get('days');
      days.on('add', this.renderNewDay, this);
      days.on('remove', this.removeDayView, this);
    },

    removeDayView: function (model) {
      this.views[model.get('date').getTime()].$el.remove();
    },

    renderDay: function (model) {
      return new DayView({model: model}).render();
    },

    render: function () {
      this.$el.addClass('schedule__loading');

      function checkExpand(view) {
        view.checkNeedExpand();
      }

      function renderAndGetEl(view) {
        return view.render().el;
      }

      var days = this.model.get('days'),
        views = {};

      days.each(function (model) {
        views[model.get('date').getTime()] = new DayView({model: model});
      });

      this.$el.html(this.template())
        .find('.schedule__days').html(_.map(views, renderAndGetEl));

      _.each(views, checkExpand);

      this.views = views;
      this.$el.removeClass('schedule__loading');
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
      var view = this.renderDay(model);
      this.views[model.get('date').getTime()] = view;
      this.$el.find('.schedule__days').append(view.el);
    },

    addDay: function () {
      this.model.addNewDay();
    }
  });
});
