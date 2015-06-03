'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var riotify = require('riotify');
var source = require('vinyl-source-stream');
var del = require('del');
var cssShrink = require('gulp-cssshrink');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var babelify = require('babelify');

gulp.task('browserify:todo', function () {
  return browserify({entries: ['client/todo_app/app.js']})
          .transform(babelify)
          .transform(riotify, {type: 'es6', 'ext': 'html'})
          .bundle()
          .pipe(source('todo.min.js'))
          .pipe(gulp.dest('dist/'));
});

gulp.task('css:todo', function () {
  return gulp.src('.client/todo_app/todo.css')
          .pipe(cssShrink())
          .pipe(sourcemaps.init())
          .pipe(minifycss({compatibility: 'ie8'}))
          .pipe(concat('todo.min.css'))
          .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function(cb) {
  del([
    'dist/**/*.js'
  ], cb);
});

gulp.task('default', ['clean', 'browserify:todo', 'css:todo']);
