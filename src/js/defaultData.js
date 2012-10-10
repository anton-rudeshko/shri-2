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
        start: parseDate('2012.15.09 12:00')
      },
      {
        title: 'Task Tracker',
        lecturer: 'veged',
        start: parseDate('2012.15.09 13:00')
      },
      {
        title: 'Wiki',
        lecturer: 'veged',
        start: parseDate('2012.15.09 14:00')
      }
    ]
  };
});