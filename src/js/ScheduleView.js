define('ScheduleView', ['backbone', 'handlebars', 'DayView', 'templates'], function (Backbone, Handlebars, DayView) {
  return Backbone.View.extend({
    className: 'schedule',
    template: Handlebars.templates['schedule'],

    events: {
      'click .schedule__start-again__button': 'startAgain'
    },

    render: function () {
      var els = this.model.daysCollection.map(function (model) {
        return new DayView({model: model}).render().el;
      });
      this.$el.html(this.template()).find('.days').html(els);
      return this;
    },

    startAgain: function () {
      window.localStorage.clear();
      this.model.initFromJson([]);
      this.render();
    }
  });
});
