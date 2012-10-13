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
      start: 0,

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

    validate: function (attrs) {
      if (!attrs.title) {
        return 'У лекции должна быть тема';
      }
      if (attrs.length < Common.TEN_MINUTES) {
        return 'Длина лекции должна быть не меньше 10 минут';
      }
      return '';
    }
  });
});