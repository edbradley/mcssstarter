// External Javascript libraries
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass to CSS & inject it into the browser
gulp.task('sass', function () {
    return gulp.src([
        'node_modules/materialize-css/sass/**/**.scss',
        'src/scss/*.scss'
    ])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

/**
 * Copy required Materialize Javasript files
 * from NPM repository to project folder (src/js)
 */
gulp.task('js', function () {
    return gulp.src([
        'node_modules/materialize-css/dist/js/materialize.js',
        'node_modules/jquery/dist/jquery.min.js'
    ])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

/**
 * Watch for HTML/Javascript/Sass file changes then
 * re-compile Sass & refresh connected browser(s)
 */
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: "./src"
    });

    gulp.watch([
        'node_modules/materialize-css/sass/materialize.scss',
        'node_modules/materialize-css/sass/components/*.scss',
        'node_modules/materialize-css/sass/components/date_picker/*.scss',
        'node_modules/materialize-css/sass/components/forms/*.scss', 
        'src/scss/*.scss'
    ], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/*.js").on('change', browserSync.reload);
});

/**
 * Copy fonts (Font-Awesome) folder from NPM repository to
 * project folder (src/fonts)
 */
gulp.task('fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/fonts"));
});

// Copy font CSS (Font-Awesome) from NPM repository to project folder (src/css)
gulp.task('fa', function () {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/css"));
});

// DEFAULT TASK ('gulp')
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);