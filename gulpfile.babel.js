import gulp from 'gulp';
import del from 'del';
import fileInclude from 'gulp-file-include';
import webserver from 'gulp-webserver';
import GulpImage from 'gulp-image';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import bro from 'gulp-bro';
import babelPolyfill from 'babelify';
import uglifyify from 'uglifyify';

const sass = gulpSass(dartSass);

const includeFile = () => {
    return gulp
        .src(['./src/html/**/*'])
        .pipe(
            fileInclude({
                prefix: '@@',
                basepath: './src/assets/front/include',
            })
        )
        .pipe(gulp.dest('./dist/html'));
};

const ws = () =>
    gulp.src('./dist').pipe(
        webserver({
            livereload: true,
            open: true,
            directoryListing: true,
        })
    );

const image = () => gulp.src('./src/assets/front/images/**/*').pipe(GulpImage()).pipe(gulp.dest('./dist/assets/front/images'));

const styles = () => {
    return gulp
        .src('./src/assets/front/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoPrefixer({ cascade: false, grid: 'autoplace' }))
        .pipe(csso())
        .pipe(gulp.dest('./dist/assets/front/css'));
};

const js = () => {
    return gulp
        .src('./src/assets/front/js/**/*.js', '!./src/assets/front/js/library/*.js')
        .pipe(
            bro({
                transform: [babelPolyfill.configure({ presets: ['@babel/preset-env'] }), ['uglifyify', { global: true }]],
            })
        )
        .pipe(gulp.dest('./dist/assets/front/js'));
};

const watch = () => {
    gulp.watch('./src/**/*', includeFile);
    gulp.watch('./src/assets/front/scss/**/*.scss', styles);
    gulp.watch('./src/assets/front/js/**/*.js', js);
};

const clean = () => del(['dist']);

const prepare = gulp.series([clean, image]);
const includes = gulp.series([includeFile, styles, js]);
const postDev = gulp.series([ws, watch]);

export const dev = gulp.series([prepare, includes, postDev]);
