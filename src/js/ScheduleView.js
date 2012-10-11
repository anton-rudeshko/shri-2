define('ScheduleView', ['backbone', 'DayView'], function (Backbone, DayView) {
  return Backbone.View.extend({
    tagName: 'ul',
    className: 'day',

    render: function () {
      var els = this.collection.map(function (model) {
        return new DayView({collection: model}).render().el;
      });
      this.$el.html(els);
      return this;
    }
  });
});
