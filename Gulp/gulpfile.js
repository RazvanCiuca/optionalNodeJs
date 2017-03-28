var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var port = config.defaultPort;

var $ = require('gulp-load-plugins')({lazy: true});
//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
//var util = require('gulp-util');
//var gulpPrint = require('gulp-print');
//var gulpif = require('gulp-if');

gulp.task('hello', function() {
    console.log('Hello World!');
});

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src([
            './src/**/*.js',
            './*.js'
        ])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Less -> CSS');

    return gulp
        .src(config.less)
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(config.temp));

});

gulp.task('clean-styles', function() {
    var files = config.temp + '**/*.css';
    return clean(files);
});

gulp.task('less-watcher', function() {
   gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function() {
    var options = config.getWireDepOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function() {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function() {
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function() {log('started');})
        .on('crash', function() {log('crashed');})
        .on('exit', function() {log('clean exit');});
});

function clean(path) {
    return del(path);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
