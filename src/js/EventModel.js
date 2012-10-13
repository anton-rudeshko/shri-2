define("EventModel", ["backbone"], function (Backbone) {
  var
    SECOND = 1000,
    MINUTE = 60*SECOND,
    HOUR = 60*MINUTE;

  return Backbone.Model.extend({
    defaults: {
      /**
       * {String} [Required]
       * Lecture title
       */
      title: "",

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
      length: HOUR,

      /**
       * {String} [Optional]
       * Lecturer
       */
      lecturer: ""
    },

    validate: function (attrs) {
      if (!attrs.title) {
        return "У лекции должна быть тема";
      }
      if (attrs.length < 10*MINUTE) {
        return "Длина лекции должна быть не меньше 10 минут";
      }
      return "";
    }
  });
});