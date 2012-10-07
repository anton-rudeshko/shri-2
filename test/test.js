require(["models/event"], function (Event) {
  TestCase("Event model test", {
    "test Event should be function": function () {
      assertFunction(Event);
    }
  });
});
