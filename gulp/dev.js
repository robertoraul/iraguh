var gulp = require('gulp'),
    config = require('./config.json');

gulp.task('clean:dev', () => {
    var del = require('del');

    return del.sync(config.clean.dev);
});

gulp.task('sass:dev', () => {
    var sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps');

    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('copy:dev', () => {
    var merge = require('merge-stream');

    var bootstrap = gulp.src('bower_components/bootstrap-sass/assets/fonts/**')
        .pipe(gulp.dest('public/fonts'));

    var fa = gulp.src('bower_components/components-font-awesome/fonts/**')
        .pipe(gulp.dest('public/fonts/font-awesome'));

    return merge(bootstrap, fa);
});
