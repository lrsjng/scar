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

ghu.task('clean', () => {
    return remove(`${BUILD}, ${DIST}`);
});

ghu.task('build:scripts', runtime => {
    return read(`${LIB}/index.js`)
        .then(webpack(webpack.cfg_umd('scar', [LIB])))
        .then(wrap(runtime.commentJs))
        .then(write(`${BUILD}/scar-${runtime.pkg.version}.js`, {overwrite: true}))
        .then(write(`${DIST}/scar.js`, {overwrite: true}))
        .then(uglify())
        .then(wrap(runtime.commentJs))
        .then(write(`${BUILD}/scar-${runtime.pkg.version}.min.js`, {overwrite: true}))
        .then(write(`${DIST}/scar.min.js`, {overwrite: true}));
});

ghu.task('build:other', () => {
    return Promise.all([
        read(`${ROOT}/*.md`)
            .then(write(mapfn.p(ROOT, BUILD), {overwrite: true})),

        read(`${TEST}: index.js`)
            .then(webpack(webpack.cfg([LIB, TEST])))
            .then(write(mapfn.p(TEST, `${BUILD}/test`), {overwrite: true})),

        read(`${TEST}: *.html, *.css`)
            .then(write(mapfn.p(TEST, `${BUILD}/test`), {overwrite: true}))
    ]);
});

ghu.task('build', ['clean', 'build:scripts', 'build:other']);

ghu.task('zip', ['build'], runtime => {
    return read(`${BUILD}/**`)
        .then(jszip({dir: BUILD, level: 9}))
        .then(write(`${BUILD}/scar-${runtime.pkg.version}.zip`, {overwrite: true}));
});

ghu.task('release', ['clean', 'zip']);
