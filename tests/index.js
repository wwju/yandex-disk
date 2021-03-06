var YandexDisk = require('..').YandexDisk;

var disk = new YandexDisk(process.argv[2], process.argv[3]);
var dirname = Math.random().toString(36).slice(2);

var tests = {
    'Подключаюсь к диску': function(callback) {
        disk.readdir('/', function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, true);
        });
    },

    'Проверяю отсутствие директории': function(callback) {
        disk.exists(dirname, function(err, exists) {
            callback(err, !exists);
        });
    },

    'Создаю директорию': function(callback) {
        disk.mkdir(dirname, function(err, status) {
            callback(err, status);
        });
    },

    'Создаю существующую директорию': function(callback) {
        disk.mkdir(dirname, function(err, status) {
            callback(err, !status);
        });
    },

    'Проверяю существование директории': function(callback) {
        disk.exists(dirname, function(err, exists) {
            callback(err, exists);
        });
    },

    'Переключаюсь в директорию (cd)': function(callback) {
        disk.cd(dirname);
        callback(null, true);
    },

    'Читаю пустую директорию': function(callback) {
        disk.readdir('.', function(err, files) {
            callback(err, !files.length);
        });
    },

    'Создаю текстовый файл из памяти': function(callback) {
        disk.writeFile('привет мир.txt', 'Привет, Мир!', 'utf8', function(err) {
            if (err) {
                return callback(err);
            }
            disk.exists('привет мир.txt', function(err, exists) {
                callback(err, exists);
            });
        });
    },

    'Создаю бинарный файл с диска': function(callback) {
        disk.uploadFile(__dirname + '/img.gif', 'img.gif', function(err) {
            if (err) {
                return callback(err);
            }
            disk.exists('img.gif', function(err, exists) {
                callback(err, exists);
            });
        });
    },
    
    'Читаю директорию с файлами': function(callback) {
        disk.readdir('.', function(err, files) {
            callback(err, files.length == 2);
        });
    },

    'Читаю текстовый файл': function(callback) {
        disk.readFile('привет мир.txt', 'utf8', function(err, content) {
            callback(err, content == 'Привет, Мир!');
        });
    },

    'Удаляю файл': function(callback) {
        disk.remove('img.gif', function(err) {
            if (err) {
                return callback(err);
            }
            disk.exists('img.gif', function(err, exists) {
                return callback(err, !exists);
            });
        });
    },

    'Удаляю директорию с файлами': function(callback) {
        disk.cd('/');
        disk.remove(dirname, function(err) {
            if (err) {
                return callback(err);
            }
            disk.exists(dirname, function(err, exists) {
                return callback(err, !exists);
            });
        });
    }
};

var tasks = Object.keys(tests).map(function(testName) {
    return function(callback) {
        tests[testName](function(err, status) {
            if (err) {
                callback(err);
            }
            console.log(testName + '\t' + (status ? '\033[92mok\033[39m' : '\033[91mfail\033[39m'));
            callback(null);
        });
    };
});

require('async').series(tasks, function(err) {
    if (err) {
        throw err;
    }
});

