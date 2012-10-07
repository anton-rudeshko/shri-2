require.config({
  paths: {
    'jquery': 'lib/jquery'
  }
});

define("app", ["jquery"], function ($) {
    $('.loading').html('Загружено');
});