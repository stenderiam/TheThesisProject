'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');

var babel = require('babelify');

var base64 = require('gulp-base64');

var env = require('gulp-env');

// add custom browserify options here
var customOpts = {
  entries: ['./index.js'],
  debug: false
};
var opts = assign({}, watchify.args, customOpts)
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);
b.transform(babel, {presets: ['react', 'es2015', 'stage-0']});

gulp.task('default', ['js', 'sass', 'watch', 'set-env']);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 6',
    'opera >= 23',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
];

function bundle() {
  return b.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      // optional, remove if you don't need to buffer file contents
      .pipe(buffer())
      // optional, remove if you dont want sourcemaps
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      // Add transformation tasks to the pipeline here.
      //.pipe(uglify())
      .pipe(sourcemaps.write('./')) // writes .map file
      .pipe(gulp.dest('./dist'));
}

gulp.task('sass',function(cb) {
  // convert stylus to css
  return gulp.src('./scss/main.scss')
      .pipe(sourcemaps.init())
        .pipe(sass({
          sourcemap: true, style: 'compact'
        }))
        .pipe(autoprefixer(autoprefixerBrowsers))
        .pipe(base64())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('set-env', function() {
  env({
    vars: {
      NODE_ENV: 'smth'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
