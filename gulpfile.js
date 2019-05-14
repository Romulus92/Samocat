const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require("gulp-babel");

const del = require('del');

const browserSync = require('browser-sync').create();

/* const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js'); */

const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminGifsicle = require('imagemin-gifsicle')
const imageminOptipng = require('imagemin-optipng')
const cache = require('gulp-cache');

const spritesmith = require('gulp.spritesmith');
const svgSprite = require('gulp-svg-sprite');

const paths = {
    root: './docs',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug'
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'docs/assets/styles/'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'docs/assets/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'docs/assets/scripts/'
    },
    fonts: {
        src: 'src/webfonts/**/*.*',
        dest: 'docs/assets/webfonts'
    },
    sprite: {
        src: 'src/sprites/**/*.png',
        dest: 'docs/assets/sprites'
    },
    svgsprite: {
        src: 'src/svg/*.svg',
        dest: 'docs/assets/svg'
    },
    php: {
        src: 'src/templates/**/*.php'
    },
    documents: {
        src: 'src/documents/**/*.*',
        dest: 'docs/assets/documents/'
    }
}

// перевод из scss в css + префиксы и минимизация
function styles() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(postcss([autoprefixer()]))
        /* .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        })) */
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// очистка
function clean() {
    return del(paths.root);
}

// перенос JS
function scripts() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest(paths.scripts.dest));
}

// перенос PHP и HTML
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(paths.root));
}

/* function php() {
    return gulp.src(paths.php.src)
        .pipe(gulp.dest(paths.root));
} */

function documents() {
    return gulp.src(paths.documents.src)
        .pipe(gulp.dest(paths.documents.dest))
}

//gulp watcher
function watch() {
    gulp.watch(paths.styles.src, styles);
    /* gulp.watch(paths.php.src, php); */
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.templates.src, templates);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        proxy: "samocat.site"
    });

    browserSync.watch("/src/styles/main.scss", ['styles']);
    browserSync.watch(paths.templates.src).on('change', browserSync.reload);
    /* browserSync.watch(paths.php.src).on('change', browserSync.reload); */
    browserSync.watch(paths.scripts.src).on('change', browserSync.reload);
    browserSync.watch(paths.images.src).on('change', browserSync.reload);
}

// ужимаем и переносим картинки
/* function images() {
    return gulp.src(paths.images.src)
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest(paths.images.dest));
} */

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imageminMozjpeg({
                quality: 80
            }),
            imageminGifsicle({
                optimizationLevel: 3,
                interlaced: true
            }),
            imageminOptipng({
                optimizationLevel: 2,
            }),
        ]))
        .pipe(gulp.dest(paths.images.dest));
}

//переносим шрифты

function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

function sprite() {
    return gulp.src(paths.sprite.src)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest(paths.sprite.dest));
}

function spritessvg() {
    return gulp.src(paths.svgsprite.src)
        .pipe(svgSprite(
            config = {
                mode: {
                    css: true,
                    inline: true,
                    symbol: true
                }
            }
        ))
        .pipe(gulp.dest(paths.svgsprite.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;

gulp.task('watch', gulp.series(
    gulp.parallel(watch, server)
))

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, /* php, */ documents, images, sprite, spritessvg, fonts, scripts)
));