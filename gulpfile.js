/* jshint node: true */

var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');

gulp.task('brackets-onsave', ['uglify']);

gulp.watch('client/**/*.js', ['uglify']);
gulp.task('uglify', function () {
    gulp.src('client/**/*.js')
        .pipe(uglify('NoteThis.min.js'))
        .pipe(gulp.dest('clientDist'));
});

gulp.watch('client/**/*.html');
gulp.task('distributeHtml', function () {
    gulp.src('client/**/*.html')
        .pipe(gulp.dest('clientDist'));
});

gulp.watch('client/**/*.css');
gulp.task('distributeCss', function () {
    gulp.src('client/**/*.css')
        .pipe(gulp.dest('clientDist'));
});

gulp.task('default', ['uglify', 'distributeHtml', 'distributeCss']);
