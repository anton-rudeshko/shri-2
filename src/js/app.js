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
define('app', ['jquery', 'defaultData', 'ScheduleModel', 'ScheduleView'], function ($, data, ScheduleModel, ScheduleView) {
  if (!window.localStorage) {
    $('.start-info').text('К сожалению, Ваш браузер не поддерживает localStorage');
    return;
  }

  window.ScheduleView = new ScheduleView({
    el: $('#content'),
    model: new ScheduleModel(data.lectures)
  }).render();
});