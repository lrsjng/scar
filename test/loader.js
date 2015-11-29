const assert = require('assert');
// const {join} = require('path');
// const {readFileSync} = require('fs');
// const {createContext, runInContext} = require('vm');

// const SCAR_PATH = join(__dirname, '../es5/scar.js');

// const lazyLoad = () => {
//     let content;
//     if (!content) {
//         content = readFileSync(SCAR_PATH, {encoding: 'utf-8'});
//     }
//     return content;
// };

// const freshES5 = () => {
//     const sandbox = {};
//     createContext(sandbox);
//     runInContext(lazyLoad(), sandbox);
//     return sandbox.scar;
// };

const pto = (timeout, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => fail ? reject(fail) : resolve('pto.resolve'), timeout);
    });
};

const rejects = (promise, error) => {
    const NO_ERROR = {};
    return Promise.resolve(promise).then(
        val => {
            NO_ERROR.val = val;
            throw NO_ERROR;
        },
        err => {
            assert.throws(() => {throw err;}, error);
        }
    )
    .catch(err => {
        err = err === NO_ERROR ? `but resolves with ${err.val}` : `but rejects with ${err}`;
        throw new Error(`expected to reject with ${error} ${err}`);
    });
};

const csl = (() => {
    const log = console.log.bind(console);
    const alt = () => {};

    const block = () => console.log = alt;
    const release = () => console.log = log;

    const thenRelease = x => {
        Promise.resolve(x).then(release, release);
        return x;
    };

    const blocked = fn => {
        block();
        return thenRelease(fn());
    };

    return {log, block, release, thenRelease, blocked};
})();

module.exports = {
    pto,
    rejects,
    csl,
    // freshES5,
    lib: require('../lib'),
    Logger: require('../lib/logger'),
    Test: require('../lib/runner').Test,
    TestRunner: require('../lib/runner').TestRunner,
    TestsRunner: require('../lib/runner').TestsRunner,
    Reporter: require('../lib/reporter'),
    Scar: require('../lib/scar'),
    util: require('../lib/util')
};
