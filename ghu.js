const {resolve, join} = require('path');
const {ghu, jszip, mapfn, read, remove, uglify, webpack, wrap, write} = require('ghu');

const ROOT = resolve(__dirname);
const LIB = join(ROOT, 'lib');
const DIST = join(ROOT, 'dist');
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
    return read(`${LIB}/index.js`)
        .then(webpack(webpack.cfg_umd('scar', [LIB]), {showStats: false}))
        .then(wrap(runtime.commentJs))
        .then(write(`${BUILD}/scar-${runtime.pkg.version}.js`, {overwrite: true}))
        .then(write(`${DIST}/scar.js`, {overwrite: true}))
        .then(uglify())
        .then(wrap(runtime.commentJs))
        .then(write(`${BUILD}/scar-${runtime.pkg.version}.min.js`, {overwrite: true}))
        .then(write(`${DIST}/scar.min.js`, {overwrite: true}));
});

ghu.task('build:tests', () => {
    return Promise.all([
        read(`${TEST}: index*.js`)
            .then(webpack(webpack.cfg([LIB, TEST]), {showStats: false}))
            .then(write(mapfn.p(TEST, `${BUILD}/test`), {overwrite: true})),

        read(`${TEST}: *.html, *.css`)
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
