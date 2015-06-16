'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var ngAnnotate = require('gulp-ng-annotate');

//==================
// DEVELOPMENT TASKS
//==================
gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('./app/*.html')
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	gulp.src('./app/scss/cac_app.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app'));
});

gulp.task ('watch', function() {
	gulp.watch(['./app/*.html'], ['html']);
	gulp.watch(['./app/scss/*.scss'], ['sass', 'html']);
});



gulp.task('default', ['connect', 'html', 'watch']);
gulp.task('build', ['annotate', 'move', 'usemin']);


// BUILD TASK
gulp.task('annotate', function() {
	return gulp.src('./app/*.js')
		.pipe(ngAnnotate())
		.pipe(gulp.dest('./app/'));
});

gulp.task('usemin', function() {
	return gulp.src('./app/*.html')
		.pipe(usemin({
			css: [minifyCss(), 'concat'],
			html: [minifyHtml({empty:true})],
			js: [uglify(), rev()]
		}))
		.pipe(gulp.dest('build/'));
});

gulp.task('move', function() {
	return gulp.src(['./app/countries/**/*.*', './app/home/**/*.*', './app/img/**/*.*'], {base:'./app/'})
		.pipe(gulp.dest('build/'));
});