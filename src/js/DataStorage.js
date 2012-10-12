define('DataStorage', function () {
  var localStorage = window.localStorage;

  return {
    setObject: function (key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },

    getObject: function (key) {
      var value = localStorage.getItem(key);
      return value && JSON.parse(value);
    },

    clear: function () {
      localStorage.clear();
    }
  };
});