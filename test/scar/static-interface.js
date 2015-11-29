const {test, assert} = require('../../lib');
const {lib, rejects} = require('../loader');

const noop = () => {};

test('test is function', () => {
    assert.equal(typeof lib.test, 'function');
});

test('test has the right props', () => {
    const act = Object.keys(lib.test).sort();
    const exp = ['scar', 'skip', 'sync', 'run'].sort();
    assert.equal(act.length, exp.length);
    act.forEach((_, idx) => assert.equal(act[idx], exp[idx]));
});

test('test()', () => {
    lib.test();
});

test.sync('test.run() no tests', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = noop;
    return testfn.run();
});

test.sync('test.run() passing', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = noop;
    testfn('passing', noop);
    return testfn.run();
});

test.sync('test.run() failing', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = noop;
    testfn('failing', () => {
        throw new Error();
    });
    return testfn.run();
});

test.sync('test.run() skipping', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = noop;
    testfn.skip('skipping', noop);
    return testfn.run();
});

test.sync('test.run() sync', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = noop;
    testfn.sync('sync', noop);
    return testfn.run();
});

test.sync('test.run() all', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = noop;
    testfn('passing', noop);
    testfn.skip('skipping', noop);
    testfn.sync('sync', noop);
    testfn('failing', () => {
        throw new Error();
    });
    return testfn.run();
});

test('test.run() no reporter', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = null;
    testfn('passing', noop);
    return testfn.run();
});

test('test.run() error in reporter throws', () => {
    const testfn = lib.Scar().static();
    testfn.scar.reporter = () => {
        throw new Error('some error object');
    };
    testfn('passing', noop);
    return rejects(testfn.run(), /some error object/);
});
