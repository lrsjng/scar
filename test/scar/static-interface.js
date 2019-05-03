const {test, assert} = require('../../lib');
const {lib} = require('../loader');

const noop = () => {};

test('test()', () => {
    assert.equal(typeof lib.test, 'function');
    const act = Object.keys(lib.test).sort();
    const exp = ['scar', 'skip', 'sync', 'run', 'cli'].sort();
    assert.deep_equal(act, exp);
    assert.equal(lib.test(), undefined);
});

test('test.run() no tests', () => {
    const testfn = (new lib.Scar()).static();
    return testfn.run({reporter: noop});
});

test('test.run() passing', () => {
    const testfn = (new lib.Scar()).static();
    testfn('passing', noop);
    return testfn.run({reporter: noop});
});

test('test.run() passing async', () => {
    const testfn = (new lib.Scar()).static();
    testfn('passing async', () => Promise.resolve());
    return testfn.run({reporter: noop});
});

test('test.run() failing', () => {
    const testfn = (new lib.Scar()).static();
    testfn('failing', () => {
        throw new Error();
    });
    return testfn.run({reporter: noop});
});

test('test.run() failing async', () => {
    const testfn = (new lib.Scar()).static();
    testfn('failing async', () => Promise.reject());
    return testfn.run({reporter: noop});
});

test('test.run() skipping', () => {
    const testfn = (new lib.Scar()).static();
    testfn.skip('skipping', noop);
    return testfn.run({reporter: noop});
});

test('test.run() sync', () => {
    const testfn = (new lib.Scar()).static();
    testfn.sync('sync', noop);
    return testfn.run({reporter: noop});
});

test('test.run() all', () => {
    const testfn = (new lib.Scar()).static();
    testfn('passing', noop);
    testfn.skip('skipping', noop);
    testfn.sync('sync', noop);
    testfn('failing', () => {
        throw new Error();
    });
    testfn('passing async', () => Promise.resolve());
    testfn('failing async', () => Promise.reject());
    return testfn.run({reporter: noop});
});

test('test.run() no reporter', () => {
    const testfn = (new lib.Scar()).static();
    testfn('passing', noop);
    return testfn.run({reporter: null});
});

test('test.run() error in reporter throws', () => {
    const testfn = (new lib.Scar()).static();
    const reporter = () => {
        throw new Error('some error object');
    };
    testfn('passing', noop);
    return assert.rejects(testfn.run({reporter}), /some error object/);
});
