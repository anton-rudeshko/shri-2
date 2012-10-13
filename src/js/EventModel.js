define('EventModel', ['backbone', 'Common'], function (Backbone, Common) {
  return Backbone.Model.extend({
    defaults: {
      /**
       * {String} [Required]
       * Lecture title
       */
      title: '',

      /**
       * {Date} [Required]
       * Start date and time
       */
      time: null,

      /**
       * {Number} [Optional]
       * Lecture length in millis
       * By default - 1 hour
       */
      length: Common.HOUR,

      /**
       * {String} [Optional]
       * Lecturer
       */
      lecturer: ''
    },

    initialize: function (attrs) {
      this.on('error', function (model, error) {
        console.log(error);
      });
      if (attrs) {
        this.set(this.parse(attrs));
      }
    },

    validate: function (attrs) {
      if (!attrs.title) {
        return 'У лекции должна быть тема';
      }
      if (!attrs.time || !attrs.time.getTime) {
        return 'Неверный формат времени';
      }
      if (attrs.length < Common.TEN_MINUTES) {
        return 'Длина лекции должна быть не меньше 10 минут';
      }
      return '';
    },

    parse: function (response) {
      var startTime = response.time;
      if (typeof startTime === 'string') {
        response.time = new Date(Date.parse(startTime));
      }
      return response;
    }
  });
});