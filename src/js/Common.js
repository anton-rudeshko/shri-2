define('Common', function () {
  /**
   * Various constants
   */
  var
    SECOND = 1000,
    MINUTE = 60*SECOND,
    HOUR = 60*MINUTE,
    DAY = 24*HOUR,

    WEEKDAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];

  function parseDate(input) {
    var
      dateParts = input.match(/(\d+)/g),
      year = dateParts[0],
      month = dateParts[1] - 1,
      day = dateParts[2],
      hour = dateParts[3],
      minute = dateParts[4];
    return new Date(year, month, day, hour, minute);
  }

  return {
    SECOND: SECOND,
    MINUTE: MINUTE,
    HOUR: HOUR,
    DAY: DAY,

    TEN_MINUTES: 10*MINUTE,

    WEEKDAYS: WEEKDAYS,

    Keys: {
      ESCAPE: 27,
      ENTER: 13
    },

    /**
     * Simple date parse
     * @param input should have pattern yyyy-mm-dd hh:mm
     * @return {Date}
     */
    parseDate: parseDate,

    formatDayTitle: function (date, currentDate) {
      currentDate = currentDate || new Date();
      if (this.onThisWeek(date, currentDate)) {
        return this.getWeekDayName(date);
      } else if (this.onNextWeek(date, currentDate)) {
        return this.getWeekDayName(date) + ', ' + this.getDate(date);
      } else {
        return this.formatDate(date);
      }
    },

    isToday: function (date) {
      return this.cropTime(date).getTime() === this.cropTime(new Date()).getTime();
    },

    onThisWeek: function (date, currentDate) {
      var diffMillis = Math.abs(currentDate.getTime() - date.getTime());
      return diffMillis <= 5*24*60*60*1000;
    },

    onNextWeek: function (date, currentDate) {
      var diffMillis = Math.abs(currentDate.getTime() - date.getTime());
      return diffMillis <= 10*24*60*60*1000;
    },

    getWeekDayName: function (date) {
      return WEEKDAYS[date.getDay()];
    },

    /**
     * Remove time information from date
     * @param {Date} date
     * @return {Date}
     */
    cropTime: function (date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },

    /**
     * Increase or decrease date (day of month) by delta
     * @param {Date} date
     * @param {Number} delta
     * @return {Date}
     */
    changeDate: function (date, delta) {
      date.setDate(date.getDate() + delta);
      return date;
    },

    /**
     * Format date to dd.MM
     * @param date
     * @return {String}
     */
    formatDate: function (date) {
      var day = this.padLeft(date.getDate() + ''),
        month = this.padLeft((date.getMonth() + 1) + '');
      return day + '.' + month;
    },

    /**
     * Format time to HH:mm
     * @param {Date} date
     * @return {String}
     */
    formatTime: function (date) {
      if (!date) {
        return '';
      }
      var hours = this.padLeft(date.getHours() + ''),
        minutes = this.padLeft(date.getMinutes() + '');
      return hours + ':' + minutes;
    },

    /**
     * Pad string left with two zeroes
     * @param {String} str
     * @return {String}
     */
    padLeft: function (str) {
      var pad = '00';
      return pad.substring(0, pad.length - str.length) + str;
    },

    /**
     * Trim all excess whitespace from string
     * @param {String} str
     * @return {String}
     */
    trimWhiteSpace: function (str) {
      if (!str) {
        return str;
      }
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/\s+/g, ' ');
    },

    lectures: [
      {
        title: 'Общий цикл разработки',
        lecturer: 'mishanga',
        start: parseDate('2012.09.15 12:00'),
        description: 'Бла-бла-бла, бла! Бла-бла, бла?',
        url: 'http://yadi.sk/d/VDsJ4ZUBiq6u'
      },
      {
        title: 'Task Tracker',
        lecturer: 'veged',
        start: parseDate('2012.09.15 13:00')
      },
      {
        title: 'Wiki',
        lecturer: 'Сергей Бережной',
        start: parseDate('2012.09.15 14:00'),
        description: 'Материал клевый, лектор жжет!'
      },
      {
        title: 'Командная строка Unix',
        lecturer: 'Виктор Ашик',
        start: parseDate('2012.09.18 19:00'),
        description: 'Материал клевый, лектор жжет жжет жжет жжет жжет жжет жжет жжет жжет жжет!'
      },
      {
        title: 'Редакторы кода',
        lecturer: 'Вячеслав Олиянчук',
        start: parseDate('2012.09.18 20:00'),
        url: 'https://github.com/yandex-shri/lectures/blob/master/05-editors.md'
      },
      {
        title: 'Браузеры',
        lecturer: 'Георгий Мостоловица',
        start: parseDate('2012.09.20 19:00')
      },
      {
        title: 'Системы контроля версий',
        lecturer: 'Георгий Мостоловица',
        start: parseDate('2012.09.20 20:00')
      },
      {
        title: 'Тестирование',
        lecturer: 'Марина Широчкина',
        start: parseDate('2012.09.22 12:00')
      },
      {
        title: 'Развертывание верстки',
        lecturer: 'Павел Пушкарев',
        start: parseDate('2012.09.22 13:00')
      },
      {
        title: 'HTTP-протокол',
        lecturer: 'Алексей Бережной',
        start: parseDate('2012.09.22 14:00')
      }
    ]
  };
});