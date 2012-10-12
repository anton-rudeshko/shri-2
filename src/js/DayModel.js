define('DayModel', ['backbone', 'underscore', 'EventCollection', 'EventModel'], function (Backbone, _, EventCollection, EventModel) {
  var DAYS = ['', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
  return Backbone.Model.extend({
    defaults: {
      events: [],
      empty: true,
      date: null,
      title: ''
    },

    initialize: function () {
      this.set('title', DAYS[this.get('date').getDay()]);
      _.bindAll(this, 'checkEmpty');
      var eventModels = _(this.get('events')).map(function (event) {
        return new EventModel(event);
      });
      this.events = new EventCollection(eventModels);
      this.events.on('change', this.checkEmpty);

      this.checkEmpty();
    },

    checkEmpty: function () {
      this.set('empty', this.events.isEmpty());
    },

    addEmpty: function () {
      this.events.add(new EventModel({start: new Date(), title: 'empty'}))
    }
  });
});
