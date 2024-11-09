const {inspect} = require('util');
const assert = require('assert');
const {lib} = require('../loader');

const insp = x => inspect(x).split('\n')[0];

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
    ['a', err => assert.strictEqual(err, 'a')]
];

const ERROR_NO_MATCH_FIXTURES = [
    ['ab', 'a'],
    ['a', /ab/],
    [new Error('some message'), 'some message'],
    ['a', err => assert.strictEqual(err, 'ab')]
];

const MESSAGE = 'test message';
const MESSAGE_RE = /test message/;

describe('assert', function () { // eslint-disable-line func-names
    this.timeout(5000);


    // assert
    it('assert()', () => {
        assert.strictEqual(typeof lib.assert, 'function', 'is function');

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
    it('assert.fail()', () => {
        assert.strictEqual(typeof lib.assert.fail, 'function', 'is function');
        assert.throws(() => {lib.assert.fail(MESSAGE);}, MESSAGE_RE, '(msg) expected to throw');

        FIXTURES.forEach(([arg, truthy], idx) => { // eslint-disable-line no-unused-vars
            const msg = `FIX[${idx}]: (${insp(arg)}) expected to throw`;
            assert.throws(() => {lib.assert.fail(arg);}, undefined, msg);
        });
    });


    // ok, not_ok
    it('assert.ok()', () => {
        assert.strictEqual(typeof lib.assert.ok, 'function', 'is function');

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

    it('assert.not_ok()', () => {
        assert.strictEqual(typeof lib.assert.not_ok, 'function', 'is function');

        FIXTURES.forEach(([arg, truthy], idx) => {
            const msg = `FIX[${idx}]: (${insp(arg)}) expected `;
            if (!truthy) {
                lib.assert.not_ok(arg, msg + 'not to throw');
            } else {
                assert.throws(() => {lib.assert.not_ok(arg);}, /expected .*? to be falsy/i, msg + 'to throw');
                assert.throws(() => {lib.assert.not_ok(arg, MESSAGE);}, MESSAGE_RE);
            }
        });
    });


    // equal, not_equal
    it('assert.equal()', () => {
        assert.strictEqual(typeof lib.assert.equal, 'function', 'is function');

        FIXTURES.forEach(([arg1,], idx1) => { // eslint-disable-line comma-dangle
            FIXTURES.forEach(([arg2,], idx2) => { // eslint-disable-line comma-dangle
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

    it('assert.not_equal()', () => {
        assert.strictEqual(typeof lib.assert.not_equal, 'function', 'is function');

        FIXTURES.forEach(([arg1,], idx1) => { // eslint-disable-line comma-dangle
            FIXTURES.forEach(([arg2,], idx2) => { // eslint-disable-line comma-dangle
                const msg = `FIX[${idx1}, ${idx2}]: (${insp(arg1)}, ${insp(arg2)}) expected `;
                if (arg1 !== arg2) {
                    lib.assert.not_equal(arg1, arg2, msg + 'not to throw');
                } else {
                    assert.throws(() => {lib.assert.not_equal(arg1, arg2);}, /expected .*? not to equal .*?/i, msg + 'to throw');
                    assert.throws(() => {lib.assert.not_equal(arg1, arg2, MESSAGE);}, MESSAGE_RE);
                }
            });
        });
    });


    // deep_equal, not_deep_equal
    it('assert.deep_equal()', () => {
        assert.strictEqual(typeof lib.assert.deep_equal, 'function', 'is function');

        DEEP_EQUAL_FIXTURES.forEach(([arg1, group1], idx1) => {
            DEEP_EQUAL_FIXTURES.forEach(([arg2, group2], idx2) => {
                const msg = `FIX[${idx1}, ${idx2}]: (${insp(arg1)}, ${insp(arg2)}) expected `;
                if (group1 === group2) {
                    lib.assert.deep_equal(arg1, arg2, msg + 'not to throw');
                } else {
                    assert.throws(() => {lib.assert.deep_equal(arg1, arg2);}, /expected .*? to deeply equal .*?/i, msg + 'to throw');
                    assert.throws(() => {lib.assert.deep_equal(arg1, arg2, MESSAGE);}, MESSAGE_RE);
                }
            });
        });
    });

    it('assert.not_deep_equal()', () => {
        assert.strictEqual(typeof lib.assert.not_deep_equal, 'function', 'is function');

        DEEP_EQUAL_FIXTURES.forEach(([arg1, group1], idx1) => {
            DEEP_EQUAL_FIXTURES.forEach(([arg2, group2], idx2) => {
                const msg = `FIX[${idx1}, ${idx2}]: (${insp(arg1)}, ${insp(arg2)}) expected `;
                if (group1 !== group2) {
                    lib.assert.not_deep_equal(arg1, arg2, msg + 'not to throw');
                } else {
                    assert.throws(() => {lib.assert.not_deep_equal(arg1, arg2);}, /expected .*? to deeply equal .*?/i, msg + 'to throw');
                    assert.throws(() => {lib.assert.not_deep_equal(arg1, arg2, MESSAGE);}, MESSAGE_RE);
                }
            });
        });
    });


    // throws
    it('assert.throws()', () => {
        assert.strictEqual(typeof lib.assert.throws, 'function', 'is function');

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
    const flip = promise => {
        return promise.then(
            () => {throw new Error('should reject');},
            () => {/* consume error */}
        );
    };

    it('assert.rejects()', () => {
        assert.strictEqual(typeof lib.assert.rejects, 'function', 'is function');
    });

    it('assert.rejects(Promise.resolve()) rejects', () => {
        return flip(lib.assert.rejects(Promise.resolve()));
    });

    it('assert.rejects(Promise.reject()) resolves', () => {
        return lib.assert.rejects(Promise.reject());
    });

    ERROR_MATCH_FIXTURES.forEach(([err, exp]) => {
        it(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}) resolves`, () => {
            return lib.assert.rejects(Promise.reject(err), exp);
        });

        it(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}, msg) resolves`, () => {
            return lib.assert.rejects(Promise.reject(err), exp, MESSAGE);
        });
    });

    ERROR_NO_MATCH_FIXTURES.forEach(([err, exp]) => {
        it(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}) rejects`, () => {
            return flip(lib.assert.rejects(Promise.reject(err), exp));
        });

        it(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}, msg) rejects`, () => {
            return flip(lib.assert.rejects(Promise.reject(err), exp, MESSAGE));
        });
    });
});
