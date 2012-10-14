define('ScheduleView', ['backbone', 'handlebars', 'DayView', 'templates'], function (Backbone, Handlebars, DayView) {
  return Backbone.View.extend({
    className: 'schedule',
    template: Handlebars.templates['schedule'],

    events: {
      'click .schedule__start-again__button': 'startAgain',
      'click .schedule__print__button': 'print',
      'click .schedule__load-2012__button': 'load2012'
    },

    render: function () {
      var els = this.model.daysCollection.map(function (model) {
        return new DayView({model: model}).render().el;
      });
      this.$el.html(this.template()).find('.children').html(els);
      return this;
    },

    startAgain: function () {
      toastr.info('Начинаем сначала');
      window.localStorage.clear();
      this.model.initFromJson([]);
      this.render();
    },

    print: function () {
      window.print();
    },

    load2012: function () {
      toastr.info('Загружаем лекции 2012');
      window.localStorage.clear();
      this.model.fetch();
      this.render();
    }
  });
});
