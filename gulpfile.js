// uncomment this to get every available class

// const { src, dest, watch, series } = require('gulp')
// const sass = require('gulp-sass')(require('sass'));

// function buildStyles() {
//   return src('styles/**/*.scss')
//     .pipe(sass())
//     .pipe(dest('styles'))
// }

// function watchTask() {
//   watch(['styles/**/*.scss'], buildStyles)
// }

// exports.default = series(buildStyles, watchTask)

// uncomment this for minified version

const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const purgecss = require('gulp-purgecss')

function buildStyles() {
  return src('styles/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(purgecss({
      content: ['pages/**/*.{js,jsx,ts,tsx}','components/**/*.{js,jsx,ts,tsx}']
    }))
    .pipe(dest('styles'))
}

function watchTask() {
  watch(['styles/**/*.scss', 'pages/**/*.{js,jsx,ts,tsx}','components/**/*.{js,jsx,ts,tsx}'], buildStyles)
}

exports.default = series(buildStyles, watchTask)

