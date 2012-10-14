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
    return new Date(year, month, day, hour, minute).getTime();
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
      ENTER: 13,
      UP: 38,
      DOWN: 40
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
        return this.getWeekDayName(date) + ', ' + this.formatDate(date);
      } else {
        return this.formatDate(date);
      }
    },

    isToday: function (date) {
      return this.cropTime(date).getTime() === this.cropTime(new Date()).getTime();
    },

    isPast: function (date) {
      return this.cropTime(date).getTime() < this.cropTime(new Date()).getTime();
    },

    isFuture: function (date) {
      return this.cropTime(date).getTime() > this.cropTime(new Date()).getTime();
    },

    onThisWeek: function (date, currentDate) {
      var diffMillis = Math.abs(currentDate.getTime() - date.getTime());
      return diffMillis <= 5*24*60*60*1000; // todo: extract
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
     *
     * @param timeStr format: HH:mm
     */
    parseTime: function (timeStr) {
      var split, time, hours, minutes;
      if (!timeStr) {
        return null;
      }
      split = timeStr.split(':');
      if (split.length != 2) {
        return null;
      }
      hours = parseInt(split[0], 10);
      minutes = parseInt(split[1], 10);
      if (isNaN(hours) || isNaN(minutes)) {
        return null;
      }
      time = new Date(0);
      time.setHours(hours);
      time.setMinutes(minutes);
      return time;
    },

    cloneDate: function (date) {
      return new Date(date.getTime());
    },

    copyTime: function (from, to) {
      to.setHours(from.getHours());
      to.setMinutes(from.getMinutes());
      to.setSeconds(from.getSeconds());
      to.setMilliseconds(from.getMilliseconds());
      return to;
    },

    toIcalDate: function (date) {
      return date.toJSON().replace(/[.:-]/g,'');
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
        time: parseDate('2012.09.15 12:00'),
        description: 'Бла-бла-бла, бла! Бла-бла, бла?',
        url: 'http://yadi.sk/d/VDsJ4ZUBiq6u'
      },
      {
        title: 'Task Tracker',
        lecturer: 'veged',
        time: parseDate('2012.09.15 13:00')
      },
      {
        title: 'Wiki',
        lecturer: 'Сергей Бережной',
        time: parseDate('2012.09.15 14:00'),
        description: 'Материал клевый, лектор жжет!'
      },
      {
        title: 'Командная строка Unix',
        lecturer: 'Виктор Ашик',
        time: parseDate('2012.09.18 19:00'),
        description: 'Материал клевый, лектор жжет жжет жжет жжет жжет жжет жжет жжет жжет жжет!'
      },
      {
        title: 'Редакторы кода',
        lecturer: 'Вячеслав Олиянчук',
        time: parseDate('2012.09.18 20:00'),
        url: 'https://github.com/yandex-shri/lectures/blob/master/05-editors.md'
      },
      {
        title: 'Браузеры',
        lecturer: 'Георгий Мостоловица',
        time: parseDate('2012.09.20 19:00')
      },
      {
        title: 'Системы контроля версий',
        lecturer: 'Георгий Мостоловица',
        time: parseDate('2012.09.20 20:00')
      },
      {
        title: 'Тестирование',
        lecturer: 'Марина Широчкина',
        time: parseDate('2012.09.22 12:00')
      },
      {
        title: 'Развертывание верстки',
        lecturer: 'Павел Пушкарев',
        time: parseDate('2012.09.22 13:00')
      },
      {
        title: 'HTTP-протокол',
        lecturer: 'Алексей Бережной',
        time: parseDate('2012.09.22 14:00')
      },
      {
        title: 'XSLT (факультативная)',
        lecturer: 'Сергей Пузанков',
        time: parseDate('2012.09.24 19:00'),
        length: 3*HOUR
      },
      {
        title: 'Механизм работы браузера',
        lecturer: 'Роман Комаров',
        time: parseDate('2012.09.25 19:00')
      },
      {
        title: 'Кеширование на клиенте и сервере',
        lecturer: 'Егор Львовский',
        time: parseDate('2012.09.25 20:00')
      },
      {
        title: 'Безопасность веб-приложений',
        lecturer: 'Тарас Иващенко',
        time: parseDate('2012.09.27 19:00')
      },
      {
        title: 'Языки программирования',
        lecturer: 'Алексей Воинов',
        time: parseDate('2012.09.27 20:00')
      },
      {
        title: 'JS. Базовые знания',
        lecturer: 'Михаил Давыдов',
        time: parseDate('2012.09.29 12:00')
      },
      {
        title: 'Транспорт. AJAX',
        lecturer: 'Михаил Давыдов',
        time: parseDate('2012.09.29 13:00')
      },
      {
        title: 'JS. Асинхронность',
        lecturer: 'Михаил Давыдов',
        time: parseDate('2012.09.29 14:00')
      },
      {
        title: 'Отладка кода',
        lecturer: 'Алексей Андросов',
        time: parseDate('2012.10.02 19:00')
      },
      {
        title: 'Клиентская оптимизация',
        lecturer: 'Иван Карев',
        time: parseDate('2012.10.04 19:00')
      },
      {
        title: 'Profiler',
        lecturer: 'Михаил Корепанов',
        time: parseDate('2012.10.04 20:00')
      },
      {
        title: 'Регулярные выражения',
        lecturer: 'Максим Ширшин',
        time: parseDate('2012.10.06 12:00')
      },
      {
        title: 'CSS',
        lecturer: 'Михаил Трошев',
        time: parseDate('2012.10.06 13:00')
      },
      {
        title: 'Фреймворки. Обзор',
        lecturer: 'Алексей Андросов',
        time: parseDate('2012.10.09 19:00')
      },
      {
        title: 'jQuery',
        lecturer: 'Алексей Бережной',
        time: parseDate('2012.10.09 20:00')
      },
      {
        title: 'БЭМ (2 лекции)',
        lecturer: 'Владимир Варанкин',
        time: parseDate('2012.10.11 19:00'),
        length: 2*HOUR
      },
      {
        title: 'Шаблонизаторы',
        lecturer: 'Сергей Бережной',
        time: parseDate('2012.10.13 12:00')
      },
      {
        title: 'Дизайн',
        lecturer: 'Константин Горский',
        time: parseDate('2012.10.13 13:00')
      },
      {
        title: 'Дизайн глазами разработчика',
        lecturer: 'Михаил Трошев',
        time: parseDate('2012.10.13 14:00')
      },
      {
        title: 'Кто-то меня проверяет...',
        lecturer: 'Привет, как дела?',
        time: parseDate('2012.10.15 15:00')
      },
      {
        title: 'Хорошего вечера',
        time: parseDate('2012.10.15 17:00')
      },
      {
        title: 'Защита экзаменов',
        lecturer: 'Сергей Бережной (veged)',
        time: parseDate('2012.10.16 19:00')
      },
      {
        title: 'Защита экзаменов',
        lecturer: 'Михаил Трошев (mishanga)',
        time: parseDate('2012.10.18 19:00')
      },
      {
        title: 'Гулянка',
        time: parseDate('2012.10.20 12:00')
      }
    ]
  };
});