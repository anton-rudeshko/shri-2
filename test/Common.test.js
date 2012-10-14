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

  TestCase('Common parseTime test', {
    'test parse empty': function () {
      assertNull(Common.parseTime(''));
    },

    'test parse null': function () {
      assertNull(Common.parseTime(null));
    },

    'test meaningless shit': function () {
      assertNull(Common.parseTime('SDH&Y@'));
    },

    'test no colon': function () {
      var time = Common.parseTime('1312');
      assertNull(time);
    },

    'test too many colons': function () {
      var time = Common.parseTime('13:1:2');
      assertNull(time);
    },

    'test normal time': function () {
      var time = Common.parseTime('13:12');
      assertNotNull(time);
      assertEquals(13, time.getHours());
      assertEquals(12, time.getMinutes());
    },

    'test half time': function () {
      var time = Common.parseTime('1:2');
      assertNotNull(time);
      assertEquals(1, time.getHours());
      assertEquals(2, time.getMinutes());
    },

    'test leading zeroes': function () {
      var time = Common.parseTime('09:08');
      assertNotNull(time);
      assertEquals(9, time.getHours());
      assertEquals(8, time.getMinutes());
    }
  });
});
