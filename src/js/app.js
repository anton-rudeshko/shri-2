require.config({
  paths: {
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone'
  },
  shim: {
    jquery: { exports: '$' },
    underscore: { exports: '_' },
    backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] }
  }
});

define("app", ["jquery", "models/event", "views/event"], function ($, Event, EventView) {
  var event = new Event({
      title: "Цикл разработки",
      lecturer: "mishanga",
      start: new Date().getTime()
    }),

    eventView = new EventView({
      model: event
    });

  $('.loading').html('Загружен').after(eventView.render().el);
});