const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const autoprefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');


function cleanDist() {
  return del('dist')
}

//local Host
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}


//create css files
function scss() {
  return src('app/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefix({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())

};

function css() {
  return src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    
    
  ])
    .pipe(concat('_libs.scss'))
    .pipe(dest('app/scss'))
    .pipe(browserSync.stream())
}

function html() {
  return src('app/*.html')
    .pipe(browserSync.stream())
}


function script() {
  return src('app/js/*.js')
    .pipe(browserSync.stream())
}

function js() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js'
    
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function images() {
  return src('app/img/**/*.*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
          ]
        })
      ]
    ))
    .pipe(dest('dist/img'))
}

//make changes
function watching() {
  watch(['app/scss/**/*.scss'], scss)
  watch(['app/*.html']).on('change', browserSync.reload)
  watch(['app/js/*.js'], script)
}

function build() {
  return src([
    'app/css/*.css',
    'app/fonts/**/*',
    'app/js/*.js',
    'app/*.html',
    'app/img/*.*'
  ], { base: 'app' })
    .pipe(dest('dist'))
}

exports.css = css;
exports.scss = scss;
exports.watching = watching;
exports.browsersync = browsersync;
exports.js = js;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);
exports.default = parallel(css, scss, js, browsersync, watching);