define('ScheduleView', ['backbone', 'handlebars', 'underscore', 'DayView', 'templates'], function (Backbone, Handlebars, _, DayView) {
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
      var days = this.model.get('days');
      days.on('add', this.renderNewDay, this);
    },

    renderDay: function (model) {
      return new DayView({model: model}).render();
    },

    render: function () {
      function checkExpand(view) {
        view.checkNeedExpand();
      }

      function extractElement(view) {
        return view.el;
      }

      var views = this.model.get('days').map(this.renderDay);

      this.$el.addClass('schedule__loading').html(this.template())
        .find('.schedule__days').html(views.map(extractElement));

      _.each(views, checkExpand);

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
      this.$el.find('.schedule__days').append(this.renderDay(model).el);
    },

    addDay: function () {
      this.model.addNewDay();
    }
  });
});
