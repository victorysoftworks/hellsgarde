const gulp = require('gulp')
const concat = require('gulp-concat-util')
const dedupe = require('gulp-dedupe')

const files = [
  './vendor/*.js',
  './src/priority/priority.js',
  './src/behaviors/behavior.js',
  './src/components/component.js',
  './src/effects/effect.js',
  './src/entities/entity.js',
  './src/*/**/*.js',
  './src/index.js'
]

gulp.task('build', async function() {
  gulp.src(files)
      .pipe(dedupe())
      .pipe(concat('hellsgarde.js'))
      .on('error', console.error.bind(console))
      .pipe(gulp.dest('build/js'))
})