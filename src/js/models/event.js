define("models/event", ["backbone"], function (Backbone) {
  /**
   * EventModel
   */
  return Backbone.Model.extend({
    defaults: {
      /**
       * {String} [Required]
       * Lecture title
       */
      title: "",

      /**
       * {Number} [Required]
       * Start date and time: unix millis
       */
      start: 0,

      /**
       * {Number} [Optional]
       * Lecture length in millis
       * By default - 1 hour
       */
      length: 3600000,

      /**
       * {String} [Optional]
       * Lecturer
       */
      lecturer: ""
    },

    validate: function (attrs) {
      if (!attrs.title) {
        return "Title is required";
      }
      return "";
    }
  });
});