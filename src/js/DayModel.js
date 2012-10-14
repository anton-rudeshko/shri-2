define('DayModel', ['backbone', 'EventCollection', 'EventModel', 'Common'], function (Backbone, EventCollection, EventModel, Common) {
  return Backbone.Model.extend({
    defaults: {
      events: [],
      date: null
    },

    initialize: function () {
      var events = new (EventCollection.extend({
        localStorage: new Backbone.LocalStorage("EC-"+this.get('date').getTime())
      }))();
      this.set('events', events);

      events.on('change:time', this.sortEvents, this);
      events.fetch();
    },

    saveAll: function () {
      this.get('events').each(function (model) {
        model.save();
      });
    },

    sortEvents: function () {
      this.get('events').sort();
    },

    addEmptyEvent: function () {
      this.get('events').add(new EventModel({time: this.suggestTime()}))
    },

    suggestTime: function () {
      var last = this.get('events').last(),
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
