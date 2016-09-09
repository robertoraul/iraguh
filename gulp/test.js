var gulp = require('gulp'),
    config = require('./config.json');

gulp.task('scsslint', () => {
    var scsslint = require('gulp-scss-lint');

    return gulp.src('public/stylesheets/**/*.scss')
        .pipe(scsslint({config: '.scss-lint.yml'}))
        .pipe(scsslint.failReporter());
});

gulp.task('eslint', () => {
    var eslint = require('gulp-eslint');

    return gulp.src(config.eslint.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('karma', cb => {
    var Server = require('karma').Server;

    new Server({
        configFile: __dirname + '/../test/karma.conf.js',
        singleRun: true
    }, code => cb(code)).start();
});
