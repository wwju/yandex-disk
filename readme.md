# Клиент для Яндекс.Диска на NodeJS

Умеет

* Создавать, читать и удалять файлы.
* Создавать и удалять директории и получать список их содержимого.
* Проверять существование файла или директории.

Пока не умеет

* Копирование и перемещение файлов и директорий.
* Чтение и установка свойств файлов и директорий.
* Публикация и закрытие файла.
* Запрос логина пользователя.
* Оповещения об изменениях на диске.

## Установка

    npm install yandex-disk

## Начало работы

    var YandexDisk = require('yandex-disk').YandexDisk;
    var disk = new YandexDisk(oauthToken); // доступ по OAuth токену
    // или
    var disk = new YandexDisk(login, password); // доступ по логину и паролю

## Методы

* `disk.cd(dirname)` - делает директорию текущей.
* `disk.writeFile(path, content, encoding, callback)` - создаёт или перезаписывает файл.
* `disk.uploadFile(srcFile, targetPath, callback)` - загружает файл из файловой системы на Я.Диск.
* `disk.readFile(path, encoding, callback)` - читает файл.
* `disk.downloadFile(srcPath, targetFile, callback)` - скачивает файл из Я.Диска в файловую систему.
* `disk.remove(path, callback)` - удаляет файл или директорию.
* `disk.exists(path, callback)` - проверяет существование файла или директории.
* `disk.mkdir(dirname, callback)` - создаёт директорию.
* `disk.readdir(path, callback)` - читает содержимое директории. Результатом является массив объектов с полями
    * `href` - путь к файлу на Я.Диске
    * `displayName` - отображаемое имя
    * `creationDate` - дата создания (строка)
    * `isDir` - если это директория, то true
    * `size` - если это файл, то размер файла, иначе `0`
    * `lastModified` - дата последней модификации (строка)

Всем callback-функциям передаются первым аргументом объект ошибки, вторым -- результат работы функции, если он есть.

## Полезные ссылки

[API Яндекс.Диска](http://api.yandex.ru/disk/)
