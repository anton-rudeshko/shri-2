define('DayModel', ['backbone', 'EventCollection', 'EventModel', 'Common'], function (Backbone, EventCollection, EventModel, Common) {
  return Backbone.Model.extend({
    defaults: {
      events: [],
      date: null
    },

    initialize: function () {
      function createEvent(event) {
        return new EventModel(event);
      }

      var eventModels = this.get('events').map(createEvent);
      this.events = new EventCollection(eventModels);
      this.events.on('change:time', this.sortEvents, this);
    },

    sortEvents: function () {
      this.events.sort();
    },

    addEmptyEvent: function () {
      this.events.add(new EventModel({time: this.suggestTime()}))
    },

    suggestTime: function () {
      var last = this.events.last(),
        time, offset;
      if (last) {
        time = last.get('time').getTime();
        offset = last.get('length');
      } else {
        time = Common.cropTime(this.get('date')).getTime();
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
