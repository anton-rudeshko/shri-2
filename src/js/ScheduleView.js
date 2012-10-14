define('ScheduleView', ['backbone', 'handlebars', 'underscore', 'toastr', 'DayView', 'templates'], function (Backbone, Handlebars, _, toastr, DayView) {
  return Backbone.View.extend({
    className: 'schedule',
    template: Handlebars.templates['schedule'],

    events: {
      'click .schedule__start-again__button': 'startAgain',
      'click .schedule__print__button'      : 'print',
      'click .schedule__load-2012__button'  : 'load2012',
      'click .schedule__add-day__button'    : 'addDay',
      'click .schedule__toggle-import-export__button': 'toggleImportExport',
      'click .schedule__export-json__button': 'exportJson',
      'click .schedule__import-json__button': 'importJson',
      'click .schedule__export-ical__button': 'exportIcal',
      'click .schedule__textarea'           : 'selectTextareaText'
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

      this.textarea = this.$('.schedule__textarea');
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
    },

    toggleImportExport: function () {
      var container = this.$('.schedule__textarea-container');
      container.slideToggle(container.is(':visible'));
    },

    selectTextareaText: function () {
      this.textarea.select();
    },

    exportJson: function () {
      var events = this.model.prepareEventsForExport();
      var text = JSON.stringify(events);
      this.textarea.val(text);
      this.textarea.select();
    },

    importJson: function () {
      var parsed,
        text = this.textarea.val();
      if (!text) {
        toastr.warning('Импортируем пустое расписание!');
      }
      try {
        parsed = JSON.parse(text || '[]');
      } catch (e) {
        toastr.error('К сожалению, Ваш JSON весьма невалиден: ' + e, 'ЕГОР');
        return;
      }
      window.localStorage.clear();
      this.model.initFromJson(parsed);
      this.render();
      toastr.info('Готово!');
    },

    exportIcal: function () {

    }
  });
});
