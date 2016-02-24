var gulp = require('gulp');

// define plug-ins
var jshint = require('gulp-jshint');
var flatten = require('gulp-flatten');
var gulpFilter = require('gulp-filter');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var bowerNormalizer = require('gulp-bower-normalize');

// Define paths variables
var dest_path =  './app/';


gulp.task('publish', function() {
    var jsFilter = gulpFilter('**/*.js', {restore: true}),
            cssFilter = gulpFilter('**/*.css', {restore: true});

        gulp.src(mainBowerFiles(), { base: 'components' })
            .pipe(bowerNormalizer({ bowerJson: './bower.json' }))
            .pipe(jsFilter)
            .pipe(uglify())
            .pipe(jsFilter.restore)
            .pipe(cssFilter)
            .pipe(minifycss())
            .pipe(cssFilter.restore)
            .pipe(gulp.dest('./app/vendor'));
});

//Browser  sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
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

// Gulp watch syntax
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
  // Minifiy and concat script
  //gulp.watch('js/*.js', ['lint', 'scripts']); 
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Default Task
gulp.task('default', ['lint', 'browserSync', 'sass', 'watch']);



// // grab libraries files from bower_components, minify and push in /public
// gulp.task('publish-components', function() {

//         var jsFilter = gulpFilter('**/*.js', {restore: true});
//         var cssFilter = gulpFilter('**/*.css', {restore: true});
//         var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf'], {restore: true});

//         return gulp.src(mainBowerFiles(), {base: 'components'})
//         .pipe(bowerNormalizer({ bowerJson: './bower.json' }))

//         // grab vendor js files from bower_components, minify and push in /public
//         .pipe(jsFilter)
//         .pipe(gulp.dest(dest_path + '/js/'))
//         .pipe(uglify())
//         .pipe(rename({
//             suffix: ".min"
//         }))
//         .pipe(gulp.dest(dest_path + '/js/'))
//         .pipe(jsFilter.restore)

//         // grab vendor css files from bower_components, minify and push in /public
//         .pipe(cssFilter)
//         .pipe(gulp.dest(dest_path + '/css'))
//         .pipe(minifycss())
//         .pipe(rename({
//             suffix: ".min"
//         }))
//         .pipe(gulp.dest(dest_path + '/css'))
//         .pipe(cssFilter.restore)

//         // grab vendor font files from bower_components and push in /public
//         .pipe(fontFilter)
//         .pipe(flatten())
//         .pipe(gulp.dest(dest_path + '/fonts'));
// });