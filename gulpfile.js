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
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var browserSync = require('browser-Sync').create();

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

gulp.task('lint:js', function () {
  return gulp.src('./client/**/*.js')
          .pipe(jshint({'lookup':true, 'linter': 'jshint'}));
          //.pipe(jshint.report('jshint-stylish'));
});

// dev task for multiple page application.
gulp.task('dev:mpa', ['default', 'dev:mpa:nodemon'], function() {

});

// server side node sync.
gulp.task('dev:mpa:nodemon', function() {
  // Server side change need to restart Express.
  nodemon({
    script: './server/express.js',
    ext: 'js node',
    ignore: ['./dist/**/*', './client/**/*', 'gulpfile.js'],
    task: []
  });
});

// dev task for sigle page application.
gulp.task('dev:spa', ['default'], function () {
  // Client change using browserSync to refresh page.
  browserSync.init({
    server: { baseDir: './dist' }
  });
  gulp.watch('clent/*.js', ['lint:js'], browserSync.reload);
  gulp.watch('clent/*.css', ['css:todo'], browserSync.reload);
  gulp.watch('clent/*.html', ['clean', 'browserify:todo'], browserSync.reload);
});

gulp.task('default', ['clean', 'browserify:todo', 'css:todo', 'lint:js']);
