define('DayCollection', ['backbone', 'DayModel', 'backbone.localstorage'], function (Backbone, DayModel) {
  return Backbone.Collection.extend({
    model: DayModel
  });
});
