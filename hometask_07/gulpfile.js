var gulp = require('gulp'),
    htmlMin = require('gulp-htmlmin'),
    cssMin = require('gulp-csso'),
    uglifyJs = require('gulp-uglifyjs'),
    BS = require('browser-sync');

gulp.task('default', ['html', 'js', 'css', 'watch', 'server'], function () {
    console.log('Gulp started!');
});

gulp.task('html', function () {
    gulp.src(['app/index.html'])
        .pipe(htmlMin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(BS.reload({stream: true}));
});

gulp.task('js', function () {
    gulp.src('app/*.js')
        .pipe(uglifyJs())
        .pipe(gulp.dest('dist'))
        .pipe(BS.reload({stream: true}));
});

gulp.task('css', function () {
    gulp.src('app/styles/*.css')
        .pipe(cssMin())
        .pipe(gulp.dest('dist/styles'))
        .pipe(BS.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(['app/*.html'], ['html']);
    gulp.watch('app/*.js', ['js']);
    gulp.watch('app/styles/*.css', ['css']);
});

gulp.task('server', function () {
    BS({
        server: {
            baseDir: 'dist'
        }
    });
});