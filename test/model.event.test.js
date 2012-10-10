require(['EventModel'], function (Event) {
  TestCase('Event model test', {
    'test Event should be function': function () {
      assertFunction(Event);
    },
    'test should not set negative length': function () {
      var event = new Event();
      event.set('length', -10);
      assertEquals(3600000, event.get('length'));
    },
    'test should not set invalid title': function () {
      var event = new Event({title: 'bla-bla'});
      event.set('title', '');
      assertEquals('bla-bla', event.get('title'));
    }
  });
});
