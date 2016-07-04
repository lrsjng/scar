const {resolve, join} = require('path');
const {ghu, jszip, mapfn, read, remove, uglify, webpack, wrap, write} = require('ghu');

const ROOT = resolve(__dirname);
const LIB = join(ROOT, 'lib');
const DIST = join(ROOT, 'es5');
const TEST = join(ROOT, 'test');
const BUILD = join(ROOT, 'build');

ghu.defaults('release');

ghu.before(runtime => {
    runtime.pkg = require('./package.json');
    runtime.comment = `${runtime.pkg.name} v${runtime.pkg.version} - ${runtime.pkg.homepage}`;
    runtime.commentJs = `/*! ${runtime.comment} */\n`;

    console.log(runtime.comment);
});

ghu.task('clean', 'delete build folder', () => {
    return remove(`${BUILD}, ${DIST}`);
});

ghu.task('build:scar', runtime => {
    const webpackConfig = {
        output: {
            library: 'scar',
            libraryTarget: 'umd'
        },
        module: {
            loaders: [
                {
                    include: [LIB],
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015']
                    }
                }
            ]
        }
    };

    return read(`${LIB}/index.js`)
        .then(webpack(webpackConfig, {showStats: false}))
        .then(uglify())
        .then(wrap(runtime.commentJs))
        .then(write(`${BUILD}/scar-${runtime.pkg.version}.min.js`, {overwrite: true}))
        .then(write(`${DIST}/scar.js`, {overwrite: true}));
});

ghu.task('build:tests', () => {
    const webpackConfig = {
        module: {
            loaders: [
                {
                    include: [LIB, TEST],
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015']
                    }
                }
            ]
        }
    };

    return Promise.all([
        read(`${TEST}: tests-scar.js, tests-mocha.js`)
            .then(webpack(webpackConfig, {showStats: false}))
            .then(write(mapfn.p(TEST, `${BUILD}/test`), {overwrite: true})),

        read(`${TEST}/*.html`)
            .then(write(mapfn.p(TEST, `${BUILD}/test`), {overwrite: true})),

        read(`${ROOT}/node_modules/mocha: mocha.js, mocha.css`)
            .then(write(mapfn.p(`${ROOT}/node_modules/mocha`, `${BUILD}/test`), {overwrite: true}))
    ]);
});

ghu.task('build:copy', () => {
    return read(`${ROOT}/*.md`)
        .then(write(mapfn.p(ROOT, BUILD), {overwrite: true}));
});

ghu.task('build', ['clean', 'build:scar', 'build:tests', 'build:copy']);

ghu.task('zip', ['build'], runtime => {
    return read(`${BUILD}/**`)
        .then(jszip({dir: BUILD, level: 9}))
        .then(write(`${BUILD}/scar-${runtime.pkg.version}.zip`, {overwrite: true}));
});

ghu.task('release', ['clean', 'zip']);
