var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');

var path = {
  HTML: 'src/index.html',
  ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
  JS: ['src/js/*.js', 'src/js/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src',
  DEST_BUILD: 'dist/build',
  DEST: 'dist'
};

// Development gulp tasks
// Take all JS files
// Convert JSX to JS
// Output results to dist/src
gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

// Copy index.html out to dist directory
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// Create task that will always run so when
// index.html or JS files are changed, previous two tasks
// will kick off automatically and update 
// the code in the dist directory
gulp.task('watch', function(){
  gulp.watch(path.ALL, ['transform', 'copy']);
});

// Set up the default task when the 'gulp' command
// is entered on the command line
gulp.task('default', ['watch']);