const {resolve, join} = require('path');
const {default: ghu, mapfn, read, remove, uglify, webpack, wrap, write} = require('ghu');

const ROOT = resolve(__dirname);
const LIB = join(ROOT, 'lib');
const DIST = join(ROOT, 'es5');
const TEST = join(ROOT, 'test');
const BUILD = join(ROOT, 'build');

ghu.defaults('build');

ghu.before(runtime => {
    runtime.pkg = require('./package.json');
    runtime.comment = `${runtime.pkg.name} v${runtime.pkg.version} - ${runtime.pkg.homepage}`;
    runtime.commentJs = `/*! ${runtime.comment} */\n`;

    console.log(runtime.comment);
});

ghu.task('clean', 'delete build folder', () => {
    return remove(BUILD, DIST);
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
                    loader: 'babel',
                    query: {cacheDirectory: true}
                }
            ]
        }
    };

    return read(`${LIB}/index.js`)
        .then(webpack(webpackConfig, {showStats: false}))
        .then(uglify())
        .then(wrap(runtime.commentJs))
        .then(write(`${DIST}/scar.js`, {overwrite: true}));
});

ghu.task('build:tests', () => {
    const webpackConfig = {
        module: {
            loaders: [
                {
                    include: [LIB, TEST],
                    loader: 'babel',
                    query: {cacheDirectory: true}
                }
            ]
        }
    };

    return read(`${TEST}: tests-scar.js, tests-mocha.js`)
        .then(webpack(webpackConfig, {showStats: false}))
        .then(write(mapfn.p(TEST, `${BUILD}`), {overwrite: true}));
});

ghu.task('copy:pages', () => {
    return read(`${TEST}/*.html`)
        .then(write(mapfn.p(`${TEST}`, `${BUILD}`), {overwrite: true}));
});

ghu.task('copy:vendor', () => {
    return read(`${ROOT}/node_modules/mocha: mocha.js, mocha.css`)
        .then(write(mapfn.p(`${ROOT}/node_modules/mocha`, `${BUILD}`), {overwrite: true}));
});

ghu.task('build', ['clean', 'build:scar', 'build:tests', 'copy:pages', 'copy:vendor']);
