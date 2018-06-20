var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel'); 

browserSync.init({
	server: "./"
});
browserSync.stream();

gulp.task('scripts', function() {
	gulp.src('./src/js/**/*.js')
		.pipe(babel()) 
		.pipe(gulp.dest("./dist/js/"));
});

gulp.task('styles', function() {
	gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('default', function() {
	gulp.watch('./src/sass/**/*.scss', ['styles', browserSync.reload])
	gulp.watch('./src/js/**/*.js', ['scripts', browserSync.reload])
	gulp.watch('./*.html', [browserSync.reload]); 
}); 
