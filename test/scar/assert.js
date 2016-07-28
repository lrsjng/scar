const {test, assert, insp} = require('../../lib');
const {lib} = require('../loader');

/* eslint-disable no-multi-spaces */
// value, truthy
const FIXTURES = [
    [undefined,   0],
    [null,        0],
    [false,       0],
    [true,        1],
    [0,           0],
    [1,           1],
    ['',          0],
    [' ',         1],
    [[],          1],
    [[0],         1],
    [{},          1],
    [{a: 0},      1],
    [/a/,         1],
    [() => null,  1]
];

// value, group
const DEEP_EQUAL_FIXTURES = [
    [undefined,             0],
    [null,                  1],
    [false,                 2],
    [true,                  3],
    [NaN,                   4],
    [NaN,                   4],
    [0,                     5],
    [1,                     6],
    ['',                    7],
    [' ',                   8],
    [/a/,                   9],
    [/a/,                  10],
    [[],                   11],
    [[],                   11],
    [{},                   12],
    [{},                   12],
    [[1],                  13],
    [[1],                  13],
    [[1, 2],               14],
    [[1, 2],               14],
    [[2, 1],               15],
    [[{}],                 16],
    [[{}],                 16],
    [{a: 1, b: 2},         17],
    [{a: 1, b: 2},         17],
    [{b: 2, a: 1},         17],
    [{a: {}, b: []},       18],
    [{b: [], a: {}},       18],
    [{a: {}, b: [1, 2]},   19],
    [{a: {}, b: [1, 2]},   19],
    [{a: {}, b: [2, 1]},   20]
];
/* eslint-enable */

const ERROR_MATCH_FIXTURES = [
    ['a', 'a'],
    ['a', /a/],
    [new Error('some message'), /some message/],
    ['a', err => assert.equal(err, 'a')]
];

const ERROR_NO_MATCH_FIXTURES = [
    ['ab', 'a'],
    ['a', /ab/],
    [new Error('some message'), 'some message'],
    ['a', err => assert.equal(err, 'ab')]
];

const MESSAGE = 'test message';
const MESSAGE_RE = /test message/;


// assert
test('assert()', () => {
    assert.equal(typeof lib.assert, 'function', 'is function');

    FIXTURES.forEach(([arg, truthy], idx) => {
        const msg = `FIX[${idx}]: (${insp(arg)}) expected `;
        if (truthy) {
            lib.assert(arg, msg + 'not to throw');
        } else {
            assert.throws(() => {lib.assert(arg);}, undefined, msg + 'to throw');
            assert.throws(() => {lib.assert(arg, MESSAGE);}, MESSAGE_RE);
        }
    });
});


// fail
test('assert.fail()', () => {
    assert.equal(typeof lib.assert.fail, 'function', 'is function');
    assert.throws(() => {lib.assert.fail(MESSAGE);}, MESSAGE_RE, '(msg) expected to throw');

    FIXTURES.forEach(([arg, truthy], idx) => {
        const msg = `FIX[${idx}]: (${insp(arg)}) expected to throw`;
        assert.throws(() => {lib.assert.fail(arg);}, undefined, msg);
    });
});


// ok, notOk
test('assert.ok()', () => {
    assert.equal(typeof lib.assert.ok, 'function', 'is function');

    FIXTURES.forEach(([arg, truthy], idx) => {
        const msg = `FIX[${idx}]: (${insp(arg)}) expected `;
        if (truthy) {
            lib.assert.ok(arg, msg + 'not to throw');
        } else {
            assert.throws(() => {lib.assert.ok(arg);}, /expected .*? to be truthy/i, msg + 'to throw');
            assert.throws(() => {lib.assert.ok(arg, MESSAGE);}, MESSAGE_RE);
        }
    });
});

test('assert.notOk()', () => {
    assert.equal(typeof lib.assert.notOk, 'function', 'is function');

    FIXTURES.forEach(([arg, truthy], idx) => {
        const msg = `FIX[${idx}]: (${insp(arg)}) expected `;
        if (!truthy) {
            lib.assert.notOk(arg, msg + 'not to throw');
        } else {
            assert.throws(() => {lib.assert.notOk(arg);}, /expected .*? to be falsy/i, msg + 'to throw');
            assert.throws(() => {lib.assert.notOk(arg, MESSAGE);}, MESSAGE_RE);
        }
    });
});


// equal, notEqual
test('assert.equal()', () => {
    assert.equal(typeof lib.assert.equal, 'function', 'is function');

    FIXTURES.forEach(([arg1,], idx1) => { // eslint-disable-line comma-dangle,comma-spacing
        FIXTURES.forEach(([arg2,], idx2) => { // eslint-disable-line comma-dangle,comma-spacing
            const msg = `FIX[${idx1}, ${idx2}]: (${insp(arg1)}, ${insp(arg2)}) expected `;
            if (arg1 === arg2) {
                lib.assert.equal(arg1, arg2, msg + 'not to throw');
            } else {
                assert.throws(() => {lib.assert.equal(arg1, arg2);}, /expected .*? to equal .*?/i, msg + 'to throw');
                assert.throws(() => {lib.assert.equal(arg1, arg2, MESSAGE);}, MESSAGE_RE);
            }
        });
    });
});

test('assert.notEqual()', () => {
    assert.equal(typeof lib.assert.notEqual, 'function', 'is function');

    FIXTURES.forEach(([arg1,], idx1) => { // eslint-disable-line comma-dangle,comma-spacing
        FIXTURES.forEach(([arg2,], idx2) => { // eslint-disable-line comma-dangle,comma-spacing
            const msg = `FIX[${idx1}, ${idx2}]: (${insp(arg1)}, ${insp(arg2)}) expected `;
            if (arg1 !== arg2) {
                lib.assert.notEqual(arg1, arg2, msg + 'not to throw');
            } else {
                assert.throws(() => {lib.assert.notEqual(arg1, arg2);}, /expected .*? not to equal .*?/i, msg + 'to throw');
                assert.throws(() => {lib.assert.notEqual(arg1, arg2, MESSAGE);}, MESSAGE_RE);
            }
        });
    });
});


// deepEqual, notDeepEqual
test('assert.deepEqual()', () => {
    assert.equal(typeof lib.assert.deepEqual, 'function', 'is function');

    DEEP_EQUAL_FIXTURES.forEach(([arg1, group1], idx1) => {
        DEEP_EQUAL_FIXTURES.forEach(([arg2, group2], idx2) => {
            const msg = `FIX[${idx1}, ${idx2}]: (${insp(arg1)}, ${insp(arg2)}) expected `;
            if (group1 === group2) {
                lib.assert.deepEqual(arg1, arg2, msg + 'not to throw');
            } else {
                assert.throws(() => {lib.assert.deepEqual(arg1, arg2);}, /expected .*? to deeply equal .*?/i, msg + 'to throw');
                assert.throws(() => {lib.assert.deepEqual(arg1, arg2, MESSAGE);}, MESSAGE_RE);
            }
        });
    });
});

test('assert.notDeepEqual()', () => {
    assert.equal(typeof lib.assert.notDeepEqual, 'function', 'is function');

    DEEP_EQUAL_FIXTURES.forEach(([arg1, group1], idx1) => {
        DEEP_EQUAL_FIXTURES.forEach(([arg2, group2], idx2) => {
            const msg = `FIX[${idx1}, ${idx2}]: (${insp(arg1)}, ${insp(arg2)}) expected `;
            if (group1 !== group2) {
                lib.assert.notDeepEqual(arg1, arg2, msg + 'not to throw');
            } else {
                assert.throws(() => {lib.assert.notDeepEqual(arg1, arg2);}, /expected .*? to deeply equal .*?/i, msg + 'to throw');
                assert.throws(() => {lib.assert.notDeepEqual(arg1, arg2, MESSAGE);}, MESSAGE_RE);
            }
        });
    });
});


// throws
test('assert.throws()', () => {
    assert.equal(typeof lib.assert.throws, 'function', 'is function');

    assert.throws(() => {lib.assert.throws();}, /function/, '() expected to throw');
    assert.throws(() => {lib.assert.throws(false);}, /function/, '(false) expected to throw');
    assert.throws(() => {lib.assert.throws(null);}, /function/, '(null) expected to throw');

    assert.throws(() => {lib.assert.throws(() => null);}, undefined, '(<fn>) expected to throw');

    lib.assert.throws(() => {throw new Error();}, undefined, '(<throwing fn>) expected not to throw');

    ERROR_MATCH_FIXTURES.forEach(([err, exp], idx) => {
        const msg = `FIX[${idx}]: (fn=>${insp(err)}, ${insp(exp)}) expected not to throw`;
        lib.assert.throws(() => {throw err;}, exp, msg);
        lib.assert.throws(() => {throw err;}, exp, MESSAGE);
    });

    ERROR_NO_MATCH_FIXTURES.forEach(([err, exp], idx) => {
        const msg = `FIX[${idx}]: (fn=>${insp(err)}, ${insp(exp)}) expected to throw`;
        assert.throws(() => {lib.assert.throws(() => {throw err;}, exp);}, undefined, msg);
        assert.throws(() => {lib.assert.throws(() => {throw err;}, exp, MESSAGE);});
    });
});


// rejects
test('assert.rejects()', () => {
    assert.equal(typeof lib.assert.rejects, 'function', 'is function');
});

test('assert.rejects(Promise.resolve()) rejects', () => {
    return assert.rejects(lib.assert.rejects(Promise.resolve()));
});

test('assert.rejects(Promise.reject()) resolves', () => {
    return lib.assert.rejects(Promise.reject());
});

ERROR_MATCH_FIXTURES.forEach(([err, exp]) => {
    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}) resolves`, () => {
        return lib.assert.rejects(Promise.reject(err), exp);
    });

    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}, msg) resolves`, () => {
        return lib.assert.rejects(Promise.reject(err), exp, MESSAGE);
    });
});

ERROR_NO_MATCH_FIXTURES.forEach(([err, exp]) => {
    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}) rejects`, () => {
        return assert.rejects(lib.assert.rejects(Promise.reject(err), exp));
    });

    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}, msg) rejects`, () => {
        return assert.rejects(lib.assert.rejects(Promise.reject(err), exp, MESSAGE));
    });
});
