var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass')(require('sass'));
var sassPackageImporter = require('node-sass-package-importer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require("gulp-rename");
var touch = require('gulp-touch-fd');

gulp.task('js', function(done) {
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/popper.js/dist/umd/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/owl.carousel/dist/owl.carousel.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/lightslider/dist/js/lightslider.js',
        'node_modules/intl-tel-input/build/js/intlTelInput-jquery.js',
        'node_modules/loading-attribute-polyfill/loading-attribute-polyfill.js',
        'script.js'])
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('js/'))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js/'))
        .pipe(touch());
    gulp.src('node_modules/intl-tel-input/build/js/utils.js')
        .pipe(gulp.dest('js/intlTelInput'));
    done();
});

gulp.task('sass', function(done) {
    gulp.src('sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            importer: sassPackageImporter(),
            outputStyle: 'compressed',
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/'))
        .pipe(touch());
    done();
});

gulp.task('flags', function(done) {
    gulp.src('node_modules/intl-tel-input/build/img/*.png')
        .pipe(gulp.dest('flags/'));
    done();
});

gulp.task('watch', function() {
    gulp.watch('js/*', gulp.parallel('js'));
    gulp.watch('sass/**/*.scss', gulp.parallel('sass'));
});

gulp.task('default', gulp.parallel('js', 'sass', 'flags'));
