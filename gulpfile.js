var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('public/src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/dist/css/'));
});