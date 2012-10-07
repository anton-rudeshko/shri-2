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

define("app", ["jquery", "backbone"], function ($, Backbone) {
  $('.loading').html('Загружено, backbone v.' + Backbone.VERSION);
});