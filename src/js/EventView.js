define('EventView', ['backbone', 'handlebars', 'Common', 'templates'], function (Backbone, Handlebars, Common) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'event',
    template: Handlebars.templates['event'],

    events: {
//      'click': 'select',

      'click    .event__title'      : 'editTitle',
      'keyup    .event__title-input': 'onKeyUp',
      'blur     .event__title-input': 'stopEditTitle'
    },

    initialize: function () {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    render: function () {
      var model = this.model.toJSON();
      model.formattedDate = Common.formatTime(model.start);
      this.$el.html(this.template(model));

      this.titleInput = this.$('.event__title-input');
      this.timeInput = this.$('.event__time-input');
      this.lecturerInput = this.$('.event__lecturer-input');

      return this;
    },

    editTitle: function () {
      this.$el.addClass('event__editing_title');
      this.titleInput.focus().val(this.titleInput.val());
    },

    onKeyUp: function(e) {
      if (e.keyCode === Common.Keys.ENTER) {
        this.stopEditTitle();
      }
      if (e.keyCode === Common.Keys.ESCAPE) {
        this.render();
      }
    },

    stopEditTitle: function () {
      var value = Common.trimWhiteSpace(this.titleInput.val());
      if (value) {
        this.titleInput.val(value);
        this.model.save({'title': value});
      }
      this.$el.removeClass("event__editing_title");
    },

    select: function () {
      this.$el.toggleClass('selected');
    }
  });
});