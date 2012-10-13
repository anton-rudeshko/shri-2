define('EventView', ['backbone', 'handlebars'], function (Backbone, Handlebars) {
  var
    ESCAPE = 27,
    ENTER = 13;

  return Backbone.View.extend({
    tagName: 'li',
    className: 'event',
    template: Handlebars.templates['event'],

    events: {
//      'click': 'select',

      'click    .event__title'      : 'editTitle',
      'keyup    .event__title-input': 'onKeyUp',
      'blur     .event__title-input': 'close'
    },

    initialize: function () {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    render: function () {
      var model = this.model.toJSON();
      model.formattedDate = this.formatDate(model.start);
      this.$el.html(this.template(model));

      this.titleInput = this.$('.event__title-input');
      this.timeInput = this.$('.event__time-input');
      this.lecturerInput = this.$('.event__lecturer-input');

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

    editTitle: function () {
      this.$el.addClass('event__editing_title');
      this.titleInput.focus().val(this.titleInput.val());
    },

    onKeyUp: function(e) {
      if (e.keyCode === ENTER) {
        this.close();
      }
      if (e.keyCode === ESCAPE) {
        this.render();
      }
    },

    close: function () {
      var value = this.trimWhiteSpace(this.titleInput.val());
      if (value) {
        this.titleInput.val(value);
        this.model.set({'title': value});
      }
      this.$el.removeClass("event__editing_title");
    },

    select: function () {
      this.$el.toggleClass('selected');
    },

    trimWhiteSpace: function (str) {
      if (!str) {
        return str;
      }
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/\s+/g,' ');
    }

  });
});