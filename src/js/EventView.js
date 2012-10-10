define('EventView', ['backbone', 'handlebars'], function (Backbone, Handlebars) {
  return Backbone.View.extend({
    tagName: 'li',

    className: 'event',

    events: {
      'click': 'select'
    },

    initialize: function () {
      this.template = Handlebars.templates['event'];
    },

    render: function () {
      var model = this.model.toJSON();
      model.formattedDate = this.formatDate(model.start);
      this.$el.html(this.template(model));
      return this;
    },

    formatDate: function (date) {
      var hours, minutes;
      if (!date) {
        return '';
      }
      hours = this.padLeft(date.getHours() + '');
      minutes = this.padLeft(date.getMinutes() + '');
      return hours + ':' + minutes;
    },

    /**
     * Pad string left with two zeroes
     * @param {String} str
     * @return {String}
     */
    padLeft: function (str) {
      var pad = '00';
      return pad.substring(0, pad.length - str.length) + str;
    },

    select: function () {
      this.$el.toggleClass('selected');
    }
  });
});