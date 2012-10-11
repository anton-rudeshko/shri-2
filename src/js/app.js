require.config({
  deps: ['templates'],
  paths: {
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'handlebars': 'lib/handlebars',
    'backbone': 'lib/backbone'
  },
  shim: {
    jquery: { exports: '$' },
    underscore: { exports: '_' },
    handlebars: { exports: 'Handlebars' },
    backbone: { exports: 'Backbone', deps: ['underscore', 'jquery'] }
  }
});

/**
 * Application entry point
 */
define('app', ['jquery', 'defaultData', 'DayModel', 'ScheduleView'], function ($, data, DayModel, ScheduleView) {
  new ScheduleView({
    el: $('#content'),
    collection: [
      new DayModel(data.lectures),
      new DayModel([]),
      new DayModel(data.lectures)
    ]
  }).render();
});