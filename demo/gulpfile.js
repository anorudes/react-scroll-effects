var $ = require('gulp-load-plugins')();
var gulp = require('gulp');
var babel = require("gulp-babel");
var react = require('gulp-react');
var notify = require("gulp-notify");
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

swallowError = function(error) {
    console.log(error.toString());
    notify().write(error.toString());
    this.emit('end');
};


gulp.task('build', function() {
    var b = browserify({
        entries: 'src/index.js',
        extensions: ['.js'],
        transform: [
                 babelify.configure({
                   stage: 0,
                })
        ]
    })
    b.bundle().on('error', function(err) {
        notify().write(err.toString());
        this.emit("end");
    }).pipe(source('bundle.js'))
    .pipe(gulp.dest('dist/'))
    .pipe($.connect.reload())
});

gulp.task("connect", function() {
    return $.connect.server({
        root: ".",
        port: 1338,
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch(['src/**'], ['build']);
});

gulp.task('default', ['watch', 'build', 'connect']);



