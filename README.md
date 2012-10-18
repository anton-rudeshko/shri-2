# Второе задание для ШРИ
[![Build Status](https://secure.travis-ci.org/anton-rudeshko/shri-2.png)](http://travis-ci.org/anton-rudeshko/shri-2)

Продакшн версия лежит в ветке [gh-pages](https://github.com/anton-rudeshko/shri-2/tree/gh-pages),
посмотреть можно, соответственно, тут: [http://anton-rudeshko.github.com/shri-2/](http://anton-rudeshko.github.com/shri-2/)

## Ручная сборка:

Исходники лежат в папке `src`

Пререквизиты:

* node
* npm
* make

Установка зависимостей:

    make install

Сборка:

    make

Всё так же работает и в [Cloud9](https://c9.io/).

Все известные баги и недоработки на конец разработки (которые сам найду) будут лежать в багтрекере.

## Использованные инструменты:

* [Багтрекер](https://trello.com/b/lMYuJiXT)
* Редакторы:
    * [Intellij IDEA 11+12](http://www.jetbrains.com/idea/)
    * [Sublime Text 2](sublimetext.com/2)
* Фреймворки:
    * [require.js](http://requirejs.org/)
    * [Backbone.js](http://backbonejs.org/) + [localStorage](https://github.com/jeromegn/Backbone.localStorage)
    * [Underscore.js](http://underscorejs.org/)
    * [jQuery](http://jquery.com/)
    * [toastr](https://github.com/CodeSeven/toastr)
* Юнит тесты: [JsTestDriver](http://code.google.com/p/js-test-driver/)
* Шаблонизатор: [Handlebars](http://handlebarsjs.com)
* Сборка:
    * [node.js](http://nodejs.org/)
    * [make](http://www.gnu.org/software/make/)