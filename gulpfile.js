'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function(){
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function(){
    gulp.src('node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('./dist/js/'));
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('fonts', function(){
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('html', function(){
    gulp.src('src/**/*.html')
        .pipe(minifyHTML({conditionals: true, spare: true, empty: true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('move', function() {
    gulp.src(['src/icons/**/*', 'src/humans.txt', 'src/browserconfig.xml', 'src/crossdomain.xml', 'src/joecochran.gpg', 'src/.htaccess'])
        .pipe(gulp.dest('dist/'));
});
gulp.task('connect', function() {
  connect.server({
    root: 'dist'
  });
});


gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['html']);
});

gulp.task('default', ['sass', 'scripts', 'fonts', 'html', 'move', 'images', 'connect', 'watch']);
