var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/app.js'
};

// Copy index.html out to dist directory
gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

// Watch the index.html for any changes and if something 
// changes, run the copy task
gulp.task('replaceHTMLsrc', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': 'src/' + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});
 
gulp.task('watch', ['replaceHTMLsrc'], function() {
  gulp.watch(path.HTML, ['replaceHTMLsrc']);
 
  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));
 
  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC));
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});


// Default task to run
gulp.task('default', ['watch']);