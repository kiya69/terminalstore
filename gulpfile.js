var gulp = require('gulp');
var run = require('gulp-run');
var connect = require('gulp-connect');
var path = require('path');

gulp.task('connect', function() {
  connect.server();
});

gulp.task('default', ['connect']);

var build_files = [
  'css/**/*.*',
  'data/**/*.*',
  'img/**/*.*',
  'js/**/*.*',
  'index.html'
];

gulp.task('build', function() {
  gulp.src(build_files, {
    base: './'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('upload', function() {
  run('aws s3 cp build s3://labs.floored.com/buildings --recursive').exec();
});

gulp.task('publish', ['build', 'upload']);