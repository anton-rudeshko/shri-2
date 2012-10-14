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
    },

    isEmpty: function () {
      return !this.get('title');
    },

    toIcal: function () {
      var
        strings = [],
        startDate = this.get('time'),
        start = Common.toIcalDate(startDate),
        end = Common.toIcalDate(new Date(startDate.getTime() + this.get('length')));

      strings.push('BEGIN:VEVENT\nORGANIZER;CN=Яндекс:MAILTO:shri@yandex.ru\n');
      strings.push('DTSTART:' + start + '\n');
      strings.push('DTEND:' + end + '\n');
      strings.push('SUMMARY:' + this.get('title') + '\n');
      strings.push('DESCRIPTION:' + (this.get('description') || '') + '\n');
      strings.push('LOCATION:Офис компании Яндекс\nEND:VEVENT\n');
      return strings.join('');
    }
  });
});