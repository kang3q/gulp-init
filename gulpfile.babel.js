import gulp from 'gulp';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';
import clean from 'gulp-clean';
import runSequence from 'run-sequence';

//gulp.task('default', gulp.series('clean', gulp.parallel('babel', 'sass', 'js', 'css', 'watch')));
gulp.task('default', () => runSequence('clean', [ 'babel', 'sass', 'js', 'css', 'watch' ]));

/////////////////////////// clean ///////////////////////////
gulp.task('clean', () =>
  gulp.src('src/dist')
    .pipe(clean()),
);

/////////////////////////// js ///////////////////////////
gulp.task('js', () =>
  gulp
    .src([ 'src/js/**/*.js', '!src/js/**/*.es6.js' ])
    .pipe(gulp.dest('src/dist/js')),
);
gulp.task('babel', () =>
  gulp
    .src('src/js/**/*.es6.js')
    .pipe(babel())
    .pipe(rename((path) => {
      path.basename = path.basename.substring(0, path.basename.indexOf('.es6'));
    }))
    .pipe(gulp.dest('src/dist/js')),
);

/////////////////////////// css ///////////////////////////
const options = {
  browsers: [ 'last 3 versions' ],
  cascade: false,
};
//const options = {
//  browsers: [
//    "Android >= 4.4",
//    "Chrome >= 20",
//    "Firefox >= 24",
//    "IE >= 8",
//    "iOS >= 6",
//    "Opera >= 12",
//    "Safari >= 6"
//  ],
//  cascade: false,
//};
gulp.task('css', () =>
  gulp
    .src('src/css/**/*.css')
    .pipe(autoprefixer(options))
    .pipe(gulp.dest('src/dist/css')),
);
gulp.task('sass', () =>
  gulp
    .src('src/css/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer(options))
    .pipe(gulp.dest('src/dist/css')),
);


/////////////////////////// watch ///////////////////////////
gulp.task('watch', () => {
  gulp.watch('src/js/**/*.js', [ 'babel', 'js' ]);
  gulp.watch('src/css/**/*.scss', [ 'sass', 'css' ]);
  gulp.watch('src/css/**/*.css', [ 'css' ]);
});

