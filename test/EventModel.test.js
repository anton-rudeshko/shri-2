require(['EventModel'], function (EventModel) {
  TestCase('EventModel test', {
    'test EventModel should be function': function () {
      assertFunction(EventModel);
    },
    'test should not set negative length': function () {
      var event = new EventModel();
      event.set('length', -10);
      assertEquals(3600000, event.get('length'));
    },
    'test should not set invalid title': function () {
      var event = new EventModel({title: 'bla-bla'});
      event.set('title', '');
      assertEquals('bla-bla', event.get('title'));
    }
  });
});
