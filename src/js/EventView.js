define('EventView', ['backbone', 'handlebars', 'Common', 'templates', 'maskedinput'], function (Backbone, Handlebars, Common) {
  return Backbone.View.extend({
    tagName: 'li',
    className: 'event',
    template: Handlebars.templates['event'],
    timeMask: '99:99',

    events: {
//      'click': 'select',

      'click .event__delete_button' : 'destroy',
      'click .event__editable span' : 'edit',
      'keyup .event__editable input': 'onKeyUp',
      'blur  .event__editable input': 'confirmEdit'
    },

    initialize: function () {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    destroy: function () {
      this.model.destroy();
    },

    prepareModel: function () {
      var model = this.model.toJSON();
      model.formattedDate = Common.formatTime(model.time);
      return model;
    },

    render: function () {
      this.$el.html(this.template(this.prepareModel())).toggleClass('event__empty', this.model.isEmpty());
      this.$('.event__time-input').mask(this.timeMask);
      return this;
    },

    edit: function (e) {
      var
        targetSpan = $(e.currentTarget),
        targetGroup = targetSpan.closest('.event__editable'),
        targetInput = targetSpan.next('input'),
        beforeEdit = targetInput.val();

      targetGroup.addClass('event__editing');
      targetInput.data('before-edit', beforeEdit).focus().val(beforeEdit);
    },

    onKeyUp: function(e) {
      if (e.keyCode === Common.Keys.ENTER) {
        this.confirmEdit(e);
      }
      if (e.keyCode === Common.Keys.ESCAPE) {
        this.cancelEdit(e);
      }
    },

    confirmEdit: function (e) {
      var
        targetInput = $(e.currentTarget),
        targetGroup = targetInput.closest('.event__editable'),
        value = Common.trimWhiteSpace(targetInput.val()),
        fieldName = targetGroup.data('field'),
        wasEmpty = this.model.isEmpty();

      if (targetInput.attr('type') === 'time') {
        value = this.parseModelTime(value);
      }

      if (value !== null && fieldName) {
        this.model.save(fieldName, value);
        if (!wasEmpty && this.model.isEmpty()) {
          this.model.destroy();
        }
      } else {
        targetInput.val(targetInput.data('before-edit'));
      }

      targetGroup.removeClass('event__editing');
    },

    cancelEdit: function (e) {
      var
        targetInput = $(e.currentTarget),
        targetGroup = targetInput.closest('.event__editable');

      targetInput.val(targetInput.data('before-edit'));
      targetGroup.removeClass('event__editing');
    },

    parseModelTime: function (time) {
      var parsed = Common.parseTime(time);
      return parsed ? Common.copyTime(parsed, Common.cloneDate(this.model.get('time'))) : null;
    },

    select: function () {
      this.$el.toggleClass('selected');
    }
  });
});