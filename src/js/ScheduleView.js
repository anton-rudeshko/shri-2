define('ScheduleView', ['backbone', 'DayView'], function (Backbone, DayView) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'days',

    render: function () {
      var els = this.model.daysCollection.map(function (model) {
        return new DayView({model: model}).render().el;
      });
      this.$el.html(els);
      return this;
    }
  });
});
