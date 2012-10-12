require(['EventView', 'EventModel'], function (EventView, EventModel) {
  TestCase('EventView test', {
    'test EventView should be function': function () {
      assertFunction(EventView);
    },
    'test should show input on double click': function () {
      var view = new EventView({ model: new EventModel() }).render();
      assertFalse(view.$el.hasClass('event__editing_title'));
      view.$('.event__title').trigger('dblclick');
      assertTrue(view.$el.hasClass('event__editing_title'));
    }
  });
});
