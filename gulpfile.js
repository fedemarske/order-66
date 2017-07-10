var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');  
var rename = require('gulp-rename');  
var uglify = require('gulp-uglify'); 

gulp.task('styles', function() {
    gulp.src('public/src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/dist/css/'));
});

var jsFiles = 'public/src/js/**/*.js',  
    jsDest = 'public/dist/js';

gulp.task('scripts', function() {  
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('watch',function() {
    gulp.watch('public/src/scss/*.scss',['styles']);
    gulp.watch('public/src/js/**/*.js',['scripts']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);