const gulp = require('gulp');
const babel = require('gulp-babel');
const connect = require('gulp-connect');
const server = require('gulp-express');

gulp.task('build', (done) => {
    gulp.src('./src/**/*')
        .pipe(babel({
            presets: ["@babel/preset-env"]
          }))
        .pipe(gulp.dest('./build/'));
        done();
}); 


// gulp.task('processHTML', (done) => {
//     gulp.src('*.html')
//       .pipe(gulp.dest('build'));
//       done();
// });


gulp.task('watch', gulp.parallel((done) => {
    gulp.watch('./*.js', gulp.series('build'));
    done();
}));

gulp.task('connect', (done) => {
    connect.server({
        root: 'build/',
        port: 3000,
        livereload: true
    });
    done(); 
});

gulp.task('default', gulp.series('build', 'watch', 'connect', (callback) => {
    callback();
}));