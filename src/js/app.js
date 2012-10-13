require.config({
  paths: {
    'jquery': 'lib/jquery',
    'underscore': 'lib/underscore',
    'handlebars': 'lib/handlebars',
    'backbone': 'lib/backbone',
    'backbone.localstorage': 'lib/backbone.localstorage'
  },
  shim: {
    'jquery': { exports: '$' },
    'underscore': { exports: '_' },
    'handlebars': { exports: 'Handlebars' },
    'backbone': { exports: 'Backbone', deps: ['underscore', 'jquery'] },
    'backbone.localstorage': { deps: ['backbone'] }
  }
});

/**
 * Application entry point
 */
define([
  'jquery', 'Common', 'ScheduleModel', 'ScheduleView',
  'templates', 'backbone.localstorage'
], function ($, Common, ScheduleModel, ScheduleView) {
  if (!window.localStorage) {
    $('.start-info').text('К сожалению, Ваш браузер не поддерживает localStorage');
    return;
  }

  window.ScheduleView = new ScheduleView({
    el: $('.content'),
    model: new ScheduleModel(Common.lectures)
  }).render();
});