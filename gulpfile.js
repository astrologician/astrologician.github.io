'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var fileInclude = require('gulp-file-include');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function(){
    return gulp.src([
        'src/js/plugins.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'src/js/picturefill.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('fonts', function(){
    gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(cache(gulp.dest('./dist/fonts/')));
});

gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(minifyHTML({conditionals: true, spare: true, empty: true}))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('images', function() {
    gulp.src('src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('move', function() {
    gulp.src(['src/icons/**/*', 'src/humans.txt', 'src/browserconfig.xml', 'src/crossdomain.xml', 'src/.htaccess'])
        .pipe(cache(gulp.dest('dist/')));
});
gulp.task('connect', function() {
  connect.server({
    root: 'dist'
  });
});


gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/img/**/*', ['images']);
});

gulp.task('default', ['sass', 'scripts', 'fonts', 'html', 'move', 'images', 'connect', 'watch']);
