define('DayCollection', ['backbone', 'DayModel', 'backbone.localstorage'], function (Backbone, DayModel) {
  return Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("DayCollection"),

    model: DayModel
  });
});
