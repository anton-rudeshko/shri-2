require.config({
  paths: {
    'jquery': 'lib/jquery',
    'maskedinput': 'lib/jquery.maskedinput',
    'toastr': 'lib/toastr',
    'underscore': 'lib/underscore',
    'handlebars': 'lib/handlebars',
    'backbone': 'lib/backbone',
    'backbone.localstorage': 'lib/backbone.localstorage'
  },
  shim: {
    'jquery': { exports: '$' },
    'maskedinput': { deps: ['jquery'] },
    'toastr': { exports: 'toastr', deps: ['jquery'] },
    'underscore': { exports: '_' },
    'handlebars': { exports: 'Handlebars' },
    'backbone': { exports: 'Backbone', deps: ['underscore', 'jquery'] },
    'backbone.localstorage': { deps: ['backbone'] }
  }
});

/**
 * Application entry point
 */
define('app', [
  'jquery', 'ScheduleModel', 'ScheduleView', 'toastr'
], function ($, ScheduleModel, ScheduleView, toastr) {
  toastr.options = {
    positionClass: 'toast-bottom-left',
    timeOut: 3000,
    fadeIn: 300,
    fadeOut: 1000
  };

  window.onerror = function()  {
    toastr.error('Что-то сломалось =( Смотри в консоль!', 'WTF!');
  };

  if (!window.localStorage) {
    $('.start-info').text('К сожалению, Ваш браузер не поддерживает localStorage =(');
    return;
  }

  try {
    var scheduleModel = new ScheduleModel();
    scheduleModel.fetch();

    window.ScheduleView = new ScheduleView({
      el: $('.content'),
      model: scheduleModel
    }).render();
  } catch (e) {
    toastr.error('Не могу стартовать =( Это всё она: ' + e, 'WTF!');
    throw e;
  }
});