var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	concat_css = require('gulp-concat-css'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer')
	;

gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.+(scss|sass)')
			   .pipe(sass())
			   .pipe(autoprefixer(['last 15 versions', '>1%', 'ie >= 10', 'Chrome >= 35', 'Firefox >= 30', 'Opera >= 20', 'Safari >= 8'], {cascade: true}))
			   .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/libs/jquery-3.2.1.min.js',
			'app/libs/fontawesome-all.min.js'
		])
			   .pipe(concat('libs.min.js'))
			   .pipe(uglify())
			   .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'] , function() {
	return gulp.src(['!app/css/style.css', 'app/css/*.css'])
			   .pipe(cssnano())
			   .pipe(concat_css('libs.min.css'))
			   .pipe(gulp.dest('app/css'));
});

gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
			   .pipe(cache(imagemin({
			   		interlaced: true,
			   		progressive: true,
			   		svgoPlugins: [{removeViewBox: false}],
			   		use: [pngquant()]
			   })))
			   .pipe(gulp.dest('public/img'))
})

gulp.task('watch', ['css-libs', 'scripts'], function() {
	gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
});


gulp.task('build', ['clean', 'img', 'sass' , 'scripts'], function(){

	var build_css = gulp.src([
			'app/css/libs.min.css',
			'app/css/style.css'
		])
					    .pipe(gulp.dest('public/css'));
	var build_fonts = gulp.src('app/fonts/**/*')
						  .pipe(gulp.dest('public/fonts'));
	var build_webfonts = gulp.src('app/webfonts/**/*')
							 .pipe(gulp.dest('public/webfonts'));
	var build_js = gulp.src('app/js/**/*')
					   .pipe(gulp.dest('public/js'));
	var build_html = gulp.src('app/*.html')
						 .pipe(gulp.dest('public/'));
	var build_json = gulp.src('app/*.json')
						 .pipe(gulp.dest('public/'));
});