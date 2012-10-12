require(['handlebars', 'templates'], function (Handlebars) {
  TestCase('Handlebars', {
    'test Handlebars should be defined': function () {
      assertObject(Handlebars);
    },
    'test Event template should be function': function () {
      assertFunction(Handlebars.templates['event']);
    }
  });
});
