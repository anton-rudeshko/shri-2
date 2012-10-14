define('ScheduleModel', ['backbone', 'underscore', 'DayModel', 'DayCollection', 'Common'], function (Backbone, _, DayModel, DayCollection, Common) {
  return Backbone.Model.extend({
    initialize: function () {
      var days = new (DayCollection.extend({
        localStorage: new Backbone.LocalStorage("Days")
      }))();

      days.on('add', function (model) {
        model.save();
      });

      this.set('days', days);
    },

    initFromJson: function (events) {
      this.get('days').reset();

      function dateWithoutTime(event) {
        return Common.cropTime(event.time).getTime();
      }

      events = _(events).map(function (event) {
        event.time = new Date(event.time);
        return event;
      });

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

      this.get('days').add(days)
    },

    fetch: function () {
      this.get('days').fetch();
      if (this.get('days').isEmpty()) {
        this.initFromJson(Common.lectures || []);
      } else {
        console.log('Loaded from localStorage');
      }
    },

    getEventTimeOrToday: function (event) {
      return event && event.time ? Common.cloneDate(event.time) : new Date();
    },

    getFirstDate: function (sortedEvents) {
      var
        event = sortedEvents[0],
        date = this.getEventTimeOrToday(event);

      return Common.cropTime(Common.changeDate(date, -2)); // two days back
    },

    getLastDate: function (sortedEvents) {
      var
        event = sortedEvents[sortedEvents.length - 1],
        date = this.getEventTimeOrToday(event);

      return Common.cropTime(Common.changeDate(date, +4)); // four days forward
    },

    addNewDay: function () {
      var date = this.suggestDate();
      date = Common.cropTime(date);
      this.get('days').add(new DayModel({ date: date }));
    },

    suggestDate: function () {
      var last = this.get('days').last();
      if (last) {
        return Common.changeDate(Common.cloneDate(last.get('date')), +1);
      } else {
        return Common.cropTime(new Date());
      }
    },

    exportToJson: function () {
      var events = [];
      this.get('days').each(function (day) {
        day.get('events').each(function (event) {
          if (event.isEmpty()) {
            return;
          }
          var item = event.toJSON();
          delete item.id;
          item.time = event.get('time').getTime();
          events.push(item);
        })
      });
      return events;
    },

    exportToIcal: function () {
      var strings = [];
      strings.push('BEGIN:VCALENDAR\nVERSION:2.0\n');
      this.get('days').each(function (day) {
        day.get('events').each(function (event) {
          if (event.isEmpty()) {
            return;
          }
          strings.push(event.toIcal());
        })
      });
      strings.push('END:VCALENDAR\n');
      return strings.join('');
    }
  });
});