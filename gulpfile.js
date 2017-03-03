var gulp = require('gulp'),
  gutil = require('gulp-util'),
  copy = require('gulp-copy'),
  jshint = require('gulp-jshint'),
  clean = require('gulp-clean'),
  concatCSS = require('gulp-concat-css'),
  prefix = require('gulp-autoprefixer'),
  fileinclude = require('gulp-file-include'),
  imageMin = require('gulp-imagemin'),
  less = require('gulp-less');


gulp.task('clean', function () {
  return gulp.src('public/')
    .pipe(clean());
})

gulp.task('jshint', ['clean'], function () {
  return gulp
    .src('src/assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest('public/assets/js/'))
})

gulp.task('copyCSS', ['clean', 'less'], function () {
  return gulp.src('src/assets/css/*.css')
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concatCSS('bundle.css'))
    .pipe(gulp.dest('public/assets/css'));
})

gulp.task('less', function () {
  return gulp
    .src('src/assets/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/assets/css'))
})


gulp.task('fileinclude', ['clean'], function () {
  return gulp
    .src('src/index.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('public/'));
})

gulp.task('imageMin', ['clean'], function () {
  return gulp
    .src('src/assets/img/*.*')
    .pipe(gulp.dest('public/assets/img'));
})


gulp.task('build', ['fileinclude', 'copyCSS', 'imageMin', 'jshint'])

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('default', ['watch']);
