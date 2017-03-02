var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(concat('rp_custom.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function () {
  return gulp.src(['./js/custom/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('production.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js/dist'));
});

gulp.task('compress', function() {
  return gulp.src('./js/custom/*.js')
    .pipe(uglify())
    .pipe(concat('production.min.js'))
    .pipe(gulp.dest('./js/dist/compressed'));
});


gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  // Watch .sass files
  gulp.watch('./sass/**/*.scss', ['sass', browserSync.reload]);
  // Watch .js files
  gulp.watch('./js/**/*.js', ['scripts', browserSync.reload]);
  // Watch image files
  // gulp.watch('./imgs/**/*', ['images', browserSync.reload]);
});

gulp.task('default', function() {
    gulp.start('sass', 'scripts', 'compress', 'watch');
});
