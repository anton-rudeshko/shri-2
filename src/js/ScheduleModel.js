define('ScheduleModel', ['backbone', 'underscore', 'DayModel', 'DayCollection', 'Common'], function (Backbone, _, DayModel, DayCollection, Common) {
  return Backbone.Model.extend({
    initialize: function () {
      this.daysCollection = new (DayCollection.extend({
        localStorage: new Backbone.LocalStorage("Days")
      }))();
      this.daysCollection.on('add', function (model) {
        model.save();
      });
    },

    initFromJson: function (events) {
      this.daysCollection.reset();

      function dateWithoutTime(event) {
        return Common.cropTime(event.time).getTime();
      }

      var
        sortedEvents = _(events).sortBy(dateWithoutTime),
        groupedEvents = _(events).groupBy(dateWithoutTime),
        firstDay = this.getFirstDate(sortedEvents),
        lastDay = this.getLastDate(sortedEvents),
        dateIterator = new Date(firstDay.getTime()),
        lastDayTime = lastDay.getTime(),
        days = [],
        day;

      while (dateIterator.getTime() <= lastDayTime) {
        day = new DayModel({ date: new Date(dateIterator.getTime()) });
        day.get('events').add(groupedEvents[dateIterator.getTime()] || []);
        day.saveAll();
        days.push(day);
        Common.changeDate(dateIterator, +1);
      }

      this.daysCollection.add(days)
    },

    fetch: function () {
      this.daysCollection.fetch();
      if (this.daysCollection.isEmpty()) {
        this.initFromJson(Common.lectures || []);
      } else {
        console.log('Loaded from localStorage');
      }
    },

    getFirstDate: function (sortedEvents) {
      var date, event = sortedEvents[0];
      if (event && event.time) {
        date =  event.time;
      } else {
        date = new Date();
      }
      return Common.cropTime(Common.changeDate(date, -2)); // two days back
    },

    getLastDate: function (sortedEvents) {
      var length = sortedEvents.length, date, event = sortedEvents[length - 1];
      if (event && event.time) {
        date =  event.time;
      } else {
        date = new Date();
      }
      return Common.cropTime(Common.changeDate(date, +4)); // four days forward
    },

    addNewDay: function () {
      console.log('Adding new day');
      this.daysCollection.add(new DayModel({ date: Common.cropTime(new Date()) }));
    }
  });
});