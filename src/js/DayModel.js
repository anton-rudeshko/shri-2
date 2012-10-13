define('DayModel', ['backbone', 'EventCollection', 'EventModel', 'Common'], function (Backbone, EventCollection, EventModel, Common) {
  return Backbone.Model.extend({
    defaults: {
      events: [],
      empty: true,
      date: null,
      title: ''
    },

    initialize: function () {
      this.set('title', Common.formatDayTitle(this.get('date')));

      var eventModels = this.get('events').map(function (event) {
        return new EventModel(event);
      });
      this.events = new EventCollection(eventModels);
      this.events.on('add remove', this.checkEmpty, this);

      this.checkEmpty();
    },

    checkEmpty: function () {
      this.set('empty', this.events.isEmpty());
    },

    addEmpty: function () {
      this.events.add(new EventModel({start: new Date(), title: 'empty'}))
    },

    parse: function (response) {
      response.date = new Date(Date.parse(response.date));
      return response;
    }
  });
});
