var gulp = require('gulp');
var pump = require('pump');
var changed = require('gulp-changed');
var cache = require('gulp-cached');

gulp.task('default', function() {
  // place code for your default task here
  console.info('nothing to do...');
});


/***********************************************
 * Javascript Tasks
 */


gulp.task('js:compress', function (cb) {
  var uglify = require('gulp-uglify');
  var pump = require('pump');
  var src = 'src/js/**/*.js';
  var dist = 'public/dist/js';
  pump([
        gulp.src(src),
        cache('js:compress'),
        changed(dist),
        uglify(),
        gulp.dest(dist),
    ],
    cb
  );
});


gulp.task('js:watch', function() {
  var watcher = gulp.watch('src/js/**/*.js', ['js:compress']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});


/***********************************************
 * CSS Tasks
 */


gulp.task('css:clean', function (cb) {
  var sass = require('gulp-sass');
  var autoprefixer = require('gulp-autoprefixer');
  var cleanCSS = require('gulp-clean-css');
  var src = 'src/sass/**/*.scss';
  var dist = 'public/dist/css';
  pump([
        gulp.src(src),
        cache('css:clean'),
        sass(),
        autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }),
        cleanCSS({compatibility: 'ie8'}),
        gulp.dest(dist),
    ],
    cb
  );
});


gulp.task('css:watch', function() {
  var watcher = gulp.watch('src/sass/**/*.scss', ['css:clean']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});


/***********************************************
 * Development Tasks
 */


gulp.task('live-server', function() {
  var gls = require('gulp-live-server');
  //3. serve multi folders at custom port
  var server = gls.static(['public'], 8088);
  server.start();
  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['public/dist/js/*.js', 'public/dist/css/*.css', 'public/index.html'], function (file) {
    server.notify.apply(server, [file]);
  });
});


/***********************************************
 * NPM Run
 */


gulp.task('watch', ['js:watch', 'css:watch']);


gulp.task('build:development', ['js:compress', 'css:clean']);

gulp.task('development', ['build:development', 'live-server', 'watch']);


gulp.task('build:production', ['js:compress', 'css:clean']);

gulp.task('production', function() {
  console.info('#TODO: production...');
});
