require.config({
  paths: {
    'jquery': 'lib/jquery'
  }
});

define("app", ["jquery"], function ($) {
    $('body').append('Hello from jQuery v' + $.fn.jquery);
});