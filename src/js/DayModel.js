define('DayModel', ['backbone', 'EventCollection', 'EventModel'], function (Backbone, EventCollection, EventModel) {
  var DAYS = ['', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
  return Backbone.Model.extend({
    defaults: {
      events: [],
      empty: true,
      date: null,
      title: ''
    },

    initialize: function () {
      this.set('title', this.extractDayTitle(this.get('date')));

      var eventModels = this.get('events').map(function (event) {
        return new EventModel(event);
      });
      this.events = new EventCollection(eventModels);
      this.events.on('add remove', this.checkEmpty, this);

      this.checkEmpty();
    },

    extractDayTitle: function (date) {
      var currentDate = new Date();
      if (this.onThisWeek(date, currentDate)) {
        return this.getWeekDayName(date);
      } else if (this.onNextWeek(date, currentDate)) {
        return this.getWeekDayName(date) + ', ' + this.getDate(date);
      } else {
        return this.getDate(date);
      }
    },

    onThisWeek: function (date, currentDate) {
      var diffMillis = Math.abs(currentDate.getTime() - date.getTime());
      return diffMillis <= 5*24*60*60*1000;
    },

    onNextWeek: function (date, currentDate) {
      var diffMillis = Math.abs(currentDate.getTime() - date.getTime());
      return diffMillis <= 10*24*60*60*1000;
    },

    getWeekDayName: function (date) {
      return DAYS[date.getDay()];
    },

    getDate: function (date) {
      // todo: pad - make utils module
      return date.getDate() + '.' + (date.getMonth() + 1);
    },

    checkEmpty: function () {
      this.set('empty', this.events.isEmpty());
    },

    addEmpty: function () {
      this.events.add(new EventModel({start: new Date(), title: 'empty'}))
    }
  });
});
