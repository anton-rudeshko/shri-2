require(['DataStorage'], function (DataStorage) {
  TestCase('DataStorage test', {
    'tearDown': function () {
      DataStorage.clear();
    },
    'test should be object': function () {
      assertObject(DataStorage);
    },
    'test should have set function': function () {
      assertFunction(DataStorage.setObject);
    },
    'test should have get function': function () {
      assertFunction(DataStorage.getObject);
    },
    'test should set and get number': function () {
      var key = 'num', value = 42;
      DataStorage.setObject(key, value);
      assertEquals(42, DataStorage.getObject(key));
    },
    'test should set and get string': function () {
      var key = 'str', value = 'hello world';
      DataStorage.setObject(key, value);
      assertEquals('hello world', DataStorage.getObject(key));
    },
    'test should set and get object': function () {
      var key = 'str', value = { a: 22, b: 32, c: { d: 'aa'} };
      DataStorage.setObject(key, value);
      assertEquals({ a: 22, b: 32, c: { d: 'aa'} }, DataStorage.getObject(key));
    },
    'test should set and get array': function () {
      var key = 'str', value = [1, 2, 6, 7];
      DataStorage.setObject(key, value);
      assertEquals([1, 2, 6, 7], DataStorage.getObject(key));
    }
  });
});
