'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('style', function() {
    gulp.src('app/stylesheets/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets/'));
});
