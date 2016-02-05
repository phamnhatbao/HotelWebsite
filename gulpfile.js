var gulp = require('gulp');
// Requires the gulp-sass plugin
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var jquery = require('gulp-jquery');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Sass
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//Get jquery from npm module
gulp.task('jquery', function () {
  return gulp.src('./node_modules/jquery-custom/src')
    .pipe(jquery({
      flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
    }))
    .pipe(gulp.dest('./app/js/'));
  // creates ./public/vendor/jquery.custom.js 
});

//Get latest jquery
// gulp.task('jquery', function () {
//   return jquery.src({
//     release: 2, //jQuery 2 
//     flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
//   })
//   .pipe(gulp.dest('app/js/'));
//   // creates ./public/vendor/jquery.custom.js 
// });

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

//Browser  sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});


// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
  // Minifiy and concat script
  //gulp.watch('js/*.js', ['lint', 'scripts']); 
});

// Default Task
gulp.task('default', ['lint', 'broserSync', 'sass', 'watch']);