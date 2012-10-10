define('EventView', ['backbone', 'handlebars'], function (Backbone, Handlebars) {
  return Backbone.View.extend({
    initialize: function () {
      this.template = Handlebars.templates['event'];
      this.model.on('error', function (model, error) {
        alert('model error: ' + error)
      });
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
      hours = this.padLeft(date.getHours() + "");
      minutes = this.padLeft(date.getMinutes() + "");
      return hours + ':' + minutes;
    },

    padLeft: function (str) {
      var pad = "00";
      return pad.substring(0, pad.length - str.length) + str;
    }
  });
});