define('ScheduleModel', ['backbone', 'underscore', 'DayModel', 'DayCollection'], function (Backbone, _, DayModel, DayCollection) {
  return Backbone.Model.extend({
    initialize: function (lectures) {
      this.daysCollection = new DayCollection();
      this.initFromJson(lectures || [])
    },

    initFromJson: function (lectures) {
      var lecturesByDate;
      if (!lectures || !lectures.length) {
        return;
      }
      lecturesByDate = _(lectures).groupBy(this.dateFootprint);
      _(lecturesByDate).each(this.addDayModel, this);
    },

    addDayModel: function (lectures) {
      // todo: add empty days
      this.daysCollection.add(new DayModel({events: lectures, date: lectures[0].start}))
    },

    dateFootprint: function (lecture) {
      var start = lecture.start;
      return "" + start.getDate() + start.getMonth() + start.getFullYear();
    }
  })
});