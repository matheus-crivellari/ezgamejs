const   fs = require('fs'),
        { src, dest, series } = require('gulp'),
        concat  = require('gulp-concat'),
        terser  = require('gulp-terser'),
        rename  = require('gulp-rename'),
        replace = require('gulp-replace'),
        babel   = require('gulp-babel');

async function release() {
    const { version } = JSON.parse(fs.readFileSync('./package.json'));

    return src('./src/**/*.js')
        .pipe(concat('ez.js'))
        .pipe(replace('{{VERSION}}', version))
        .pipe(babel({
            plugins: ['@babel/plugin-proposal-class-properties'],
        }))
        .pipe(dest('./dist'))
        .pipe(terser())
        .pipe(rename('ez.min.js'))
        .pipe(dest('./dist'));
}

async function minify() {
    return src('./dist/ez.js')
        .pipe(terser())
        .pipe(rename('ez.min.js'))
        .pipe(dest('./dist'));
}

exports.release = release;
exports.minify = minify;
exports.default = series([release, minify]);