'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');

gulp.task('sass', function(){
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function(){
    // create modernizr.js from node module
    gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('./js/'));
    // gulp.src('node_modules/foundation/vendor/jquery.js')
});

gulp.task('fonts', function(){
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./fonts/'));
});

gulp.task('connect', function() {
  connect.server();
});


gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'scripts', 'fonts', 'connect', 'watch']);
