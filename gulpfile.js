require('require-dir')('./gulp');
var gulp = require('gulp');

gulp.task('default',
    [
        'clean:dev',
        'copy:dev',
        'sass:dev'
    ],
    () => gulp.watch('app/stylesheets/{,*/}*.{scss,sass}', ['sass:dev'])
);

gulp.task('test', ['scsslint', 'eslint']);

gulp.task('dist', [
    'useref',
    'htmlmin',
    'copy:dist',
    'sass:dist',
    'package'
]);

gulp.task('build', ['clean:dist', 'test'], () =>
    gulp.run(['dist', 'config:prod'])
);

gulp.task('build:uat', ['clean:dist', 'test'], () =>
    gulp.run(['dist', 'config:uat'])
);
