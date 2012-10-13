require(['Common'], function (Common) {
  TestCase('Common cropTime test', {
    setUp: function () {
      this.date = new Date(2012, 10, 15, 11, 33, 32, 13);
    },

    'test crop time not equals': function () {
      console.log('Original date: ' + this.date);
      var cropped = Common.cropTime(this.date);

      console.log('Cropped date : ' + cropped);
      assertNotEquals(this.date, cropped);
    },

    'test crop time crops time': function () {
      var cropped = Common.cropTime(this.date);

      assertEquals(0, cropped.getMinutes());
      assertEquals(0, cropped.getHours());
      assertEquals(0, cropped.getSeconds());
      assertEquals(0, cropped.getMilliseconds());
    },

    'test cropped with same date is equal': function () {
      var cropped1 = Common.cropTime(this.date)
        , cropped2 = Common.cropTime(new Date(2012, 10, 15, 15, 21, 1, 3));

      assertEquals(cropped1, cropped2);
      assertEquals(cropped1.getTime(), cropped2.getTime());
    },

    'test cropped with different date is not equal': function () {
      var cropped1 = Common.cropTime(this.date)
        , cropped2 = Common.cropTime(new Date(2012, 10, 14, 15, 21, 1, 3));

      assertNotEquals(cropped1, cropped2);
      assertNotEquals(cropped1.getTime(), cropped2.getTime());
    }
  });

  TestCase('Common trimWhiteSpace test', {
    'test trim blank equals to empty': function () {
      assertEquals('', Common.trimWhiteSpace('    '));
    },

    'test trim left': function () {
      assertEquals('aaa', Common.trimWhiteSpace('   aaa'));
    },

    'test trim right': function () {
      assertEquals('aaa', Common.trimWhiteSpace('aaa     '));
    },

    'test trim inside': function () {
      assertEquals('aaa bbb ccc', Common.trimWhiteSpace('aaa    bbb ccc'));
    },

    'test trim all': function () {
      assertEquals('aaa bbb ccc ddd', Common.trimWhiteSpace('     aaa     bbb   ccc    ddd  '));
    }
  });
});
