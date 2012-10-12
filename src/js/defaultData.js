define('defaultData', function () {
  /**
   * Simple date parse
   * @param input should have pattern yyyy-mm-dd hh:mm
   * @return {Date}
   */
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
    parseDate: parseDate,

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