const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css', function(done) {
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    //converting sass to css
    .pipe(sass())
     //compressing them 
    .pipe(cssnano())

    //I need to put them into folder
    .pipe(gulp.dest('./assets.css'))


    //for the production we change the path we put it in public folder
    
    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})


gulp.task('js', function(done) {
    console.log('minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();

});


gulp.task('images', function(done){
    console.log('compressing images..');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'))
    done();
});


//empty the public assets directory
//whenever you are building the project  you need to clear previous build
//and  build it from scratch
gulp.task('clean:assets', function(done) {
    del.sync('./public/assets');
    done();
});


gulp.task('build',gulp.series('clean:assets','css', 'js', 'images'), function(done) {
   console.log('Building assets');
    done();
});

