define('DayModel', ['backbone', 'EventCollection', 'EventModel', 'Common'], function (Backbone, EventCollection, EventModel, Common) {
  return Backbone.Model.extend({
    defaults: {
      events: [],
      empty: true,
      date: null,
      title: '',
      isToday: false,
      emptyEvent: new EventModel()
    },

    initialize: function () {
      var date = this.get('date');

      this.set('title', Common.formatDayTitle(date));
      this.set('isToday', Common.isToday(date));

      function createEvent(event) {
        return new EventModel(event);
      }

      var eventModels = this.get('events').map(createEvent);
      this.events = new EventCollection(eventModels);
      this.events.on('add remove', this.checkEmpty, this);

      this.checkEmpty();
    },

    checkEmpty: function () {
      this.set('empty', this.events.isEmpty());
    },

    addEmpty: function () {
      this.events.add(new EventModel({time: this.suggestTime()}))
    },

    suggestTime: function () {
      var last = this.events.last(),
        time, offset;
      if (last) {
        time = last.get('time').getTime();
        offset = last.get('length');
      } else {
        time = Common.cropTime(new Date()).getTime();
        offset = 9*Common.HOUR;
      }
      return new Date(time + offset);
    },

    parse: function (response) {
      response.date = new Date(Date.parse(response.date));
      return response;
    }
  });
});
