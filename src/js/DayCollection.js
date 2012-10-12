define('DayCollection', ['backbone', 'DayModel'], function (Backbone, DayModel) {
  return Backbone.Collection.extend({
    model: DayModel
  });
});
