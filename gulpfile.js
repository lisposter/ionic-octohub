var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./app/scss/**/*.scss'],
  vendor_js: [
    'vendor/ionic/js/ionic.bundle.js',
    'vendor/ngCordova/dist/ng-cordova.min.js',
    'vendor/ng-cordova-gatekeeper/ng-cordova-gatekeeper.js',
    'vendor/angular-moment/angular-moment.js',
    'vendor/moment/moment.js'
  ],
  vendor_assets: [
    'vendor/ionic/fonts/**/**'
  ],
  templates: [
    'app/templates/**/**',
    'app/index.html'
  ],
  js: [
    'app/js/**/**.js',
    'app/config.js'
  ]
};

gulp.task('default', ['sass', 'vendor:js', 'vendor:assets', 'js', 'templates']);

gulp.task('sass', function(done) {
  gulp.src('app/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('templates', function(done) {
  gulp.src(paths.templates)
    .pipe(copy('./www/', { prefix: 1 }))
    .on('end', done);
});

gulp.task('js', function(done) {
  gulp.src(paths.js)
    .pipe(copy('./www/', { prefix: 1 }))
    .on('end', done);
});

gulp.task('vendor:js', function(done) {
  gulp.src(paths.vendor_js)
    .pipe(copy('./www/lib/', { prefix: 1 }))
    .on('end', done);
});

gulp.task('vendor:assets', function(done) {
  gulp.src(paths.vendor_assets)
    .pipe(copy('./www/lib/', { prefix: 1 }))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.vendor_js, ['vendor:js']);
  gulp.watch(paths.vendor_assets, ['vendor:assets']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
