

const { watch, series, task} = require('gulp');
const helper = require('gulp-sass-helper');

const paths = { sass: { src: ['./src/**/*.scss', '!./node_modules/**/*.scss'], dest: './src' } };

const runSassCompiler = (done) => {
    helper.sassCompiler(paths);
    done();
};

const build = series(runSassCompiler);

const watchFiles = () => {
    watch(paths.sass.src, build);
};

task('default', series(build, watchFiles));
