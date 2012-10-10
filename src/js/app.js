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
define('app', ['jquery', 'defaultData', 'models/shri', 'views/shri'], function ($, data, ShriModel, ShriView) {
  window.ShriView = new ShriView({
    model: new ShriModel(data.lectures),
    el: $('#content')
  }).render();
});