const assert = require('assert');

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
    lib: require('../lib'),
    Logger: require('../lib/logger'),
    Test: require('../lib/runner').Test,
    TestRunner: require('../lib/runner').TestRunner,
    TestsRunner: require('../lib/runner').TestsRunner,
    Reporter: require('../lib/reporter'),
    Scar: require('../lib/scar'),
    util: require('../lib/util')
};
