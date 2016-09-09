var gulp = require('gulp'),
    config = require('./config.json');

gulp.task('clean:dist', () => {
    var del = require('del');

    return del(config.clean.dist);
});

gulp.task('useref', () => {
    var pkg = require('../package'),
        gulpif = require('gulp-if'),
        useref = require('gulp-useref'),
        babel = require('gulp-babel'),
        htmlmin = require('gulp-htmlmin'),
        replace = require('gulp-replace');

    return gulp.src(['public/views/index.html', 'public/views/signin.html'])
        .pipe(replace('@version', pkg.version))
        .pipe(useref())
        .pipe(gulpif(['js/*.js','!js/app.js'], babel({compact: true})))
        .pipe(gulpif('js/app.js', babel({presets: ['babili']})))
        .pipe(gulpif(['js/*.js', 'css/app.css'], gulp.dest('dist/public')))
        .pipe(gulpif('*.html', htmlmin(config.htmlmin.options)))
        .pipe(gulpif('*.html', gulp.dest('dist/public/views')));
});

gulp.task('sass:dist', () => {
    var sass = require('gulp-sass');

    return gulp.src(config.sass.src)
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/public/css'));
});

gulp.task('copy:dist', () => {
    var merge = require('merge-stream');

    var bootstrap = gulp.src('bower_components/bootstrap-sass/assets/fonts/**')
        .pipe(gulp.dest('dist/public/fonts'));

    var fa = gulp.src('bower_components/components-font-awesome/fonts/**')
        .pipe(gulp.dest('dist/public/fonts/font-awesome'));

    var resources = gulp.src(config.copy.dist.src, {base: '.'})
        .pipe(gulp.dest(config.copy.dist.dest));

    return merge(bootstrap, fa, resources);
});

gulp.task('htmlmin', () => {
    var htmlmin = require('gulp-htmlmin');

    gulp.src(config.htmlmin.src)
        .pipe(htmlmin(config.htmlmin.options))
        .pipe(gulp.dest(config.htmlmin.dest));
});

gulp.task('config:prod', () => {
    var rename = require('gulp-rename');

    return gulp.src('./config.prod.json')
        .pipe(rename('config.json'))
        .pipe(gulp.dest('dist'));
});

gulp.task('config:uat', () => {
    var rename = require('gulp-rename');

    return gulp.src('./config.uat.json')
        .pipe(rename('config.json'))
        .pipe(gulp.dest('dist'));
});

gulp.task('package', () => {
    var jseditor = require('gulp-json-editor');

    return gulp.src('./package.json')
        .pipe(jseditor(json => {
            delete json.devDependencies;
            return json;
        }))
        .pipe(gulp.dest('dist/'));
});
