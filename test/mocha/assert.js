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
const DEEP_FIXTURES = [
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

describe('assert', () => {
    // assert
    it('assert is function', () => {
        assert.strictEqual(typeof lib.assert, 'function');
    });

    FIXTURES.forEach(([arg, truthy]) => {
        if (truthy) {
            it(`assert(${insp(arg)}) does not throw`, () => {
                lib.assert(arg);
                lib.assert(arg, MESSAGE);
            });
        } else {
            it(`assert(${insp(arg)}) throws`, () => {
                assert.throws(() => {lib.assert(arg);}, /no message/i);
                assert.throws(() => {lib.assert(arg, MESSAGE);}, MESSAGE_RE);
            });
        }
    });


    // fail
    it('assert.fail is function', () => {
        assert.strictEqual(typeof lib.assert.fail, 'function');
    });

    it('assert.fail(msg) throws', () => {
        assert.throws(() => {lib.assert.fail(MESSAGE);}, MESSAGE_RE);
    });

    FIXTURES.forEach(([arg,]) => { // eslint-disable-line comma-dangle,comma-spacing
        it(`assert.fail(${insp(arg)}) throws`, () => {
            assert.throws(() => {lib.assert.fail(arg);});
        });
    });


    // ok, notOk
    it('assert.ok is function', () => {
        assert.strictEqual(typeof lib.assert.ok, 'function');
    });

    it('assert.notOk is function', () => {
        assert.strictEqual(typeof lib.assert.notOk, 'function');
    });

    FIXTURES.forEach(([arg, truthy]) => {
        if (truthy) {
            it(`assert.ok(${insp(arg)}) does not throw`, () => {
                lib.assert.ok(arg);
                lib.assert.ok(arg, MESSAGE);
            });
            it(`assert.notOk(${insp(arg)}) throws`, () => {
                assert.throws(() => {lib.assert.notOk(arg);}, /expected .*? to be falsy/i);
                assert.throws(() => {lib.assert.notOk(arg, MESSAGE);}, MESSAGE_RE);
            });
        } else {
            it(`assert.ok(${insp(arg)}) throws`, () => {
                assert.throws(() => {lib.assert.ok(arg);}, /expected .*? to be truthy/i);
                assert.throws(() => {lib.assert.ok(arg, MESSAGE);}, MESSAGE_RE);
            });
            it(`assert.notOk(${insp(arg)}) does not throw`, () => {
                lib.assert.notOk(arg);
                lib.assert.notOk(arg, MESSAGE);
            });
        }
    });


    // equal, notEqual
    it('assert.equal is function', () => {
        assert.strictEqual(typeof lib.assert.equal, 'function');
    });

    it('assert.notEqual is function', () => {
        assert.strictEqual(typeof lib.assert.notEqual, 'function');
    });

    FIXTURES.forEach(([arg1,]) => { // eslint-disable-line comma-dangle,comma-spacing
        FIXTURES.forEach(([arg2,]) => { // eslint-disable-line comma-dangle,comma-spacing
            if (arg1 === arg2) {
                it(`assert.equal(${insp(arg1)}, ${insp(arg2)}) does not throw`, () => {
                    lib.assert.equal(arg1, arg2);
                    lib.assert.equal(arg1, arg2, MESSAGE);
                });
                it(`assert.notEqual(${insp(arg1)}, ${insp(arg2)}) throws`, () => {
                    assert.throws(() => {lib.assert.notEqual(arg1, arg2);}, /expected .*? not to equal .*?/i);
                    assert.throws(() => {lib.assert.notEqual(arg1, arg2, MESSAGE);}, MESSAGE_RE);
                });
            } else {
                it(`assert.equal(${insp(arg1)}, ${insp(arg2)}) throws`, () => {
                    assert.throws(() => {lib.assert.equal(arg1, arg2);}, /expected .*? to equal .*?/i);
                    assert.throws(() => {lib.assert.equal(arg1, arg2, MESSAGE);}, MESSAGE_RE);
                });
                it(`assert.notEqual(${insp(arg1)}, ${insp(arg2)}) does not throw`, () => {
                    lib.assert.notEqual(arg1, arg2);
                    lib.assert.notEqual(arg1, arg2, MESSAGE);
                });
            }
        });
    });


    // deepEqual, notDeepEqual
    it('assert.deepEqual is function', () => {
        assert.strictEqual(typeof lib.assert.deepEqual, 'function');
    });

    it('assert.notDeepEqual is function', () => {
        assert.strictEqual(typeof lib.assert.notDeepEqual, 'function');
    });

    DEEP_FIXTURES.forEach(([arg1, group1]) => {
        DEEP_FIXTURES.forEach(([arg2, group2]) => {
            if (group1 === group2) {
                it(`assert.deepEqual(${insp(arg1)}, ${insp(arg2)}) does not throw`, () => {
                    lib.assert.deepEqual(arg1, arg2);
                    lib.assert.deepEqual(arg1, arg2, MESSAGE);
                });
                it(`assert.notDeepEqual(${insp(arg1)}, ${insp(arg2)}) throws`, () => {
                    assert.throws(() => {lib.assert.notDeepEqual(arg1, arg2);}, /expected .*? not to deeply equal .*?/i);
                    assert.throws(() => {lib.assert.notDeepEqual(arg1, arg2, MESSAGE);}, MESSAGE_RE);
                });
            } else {
                it(`assert.deepEqual(${insp(arg1)}, ${insp(arg2)}) throws`, () => {
                    assert.throws(() => {lib.assert.deepEqual(arg1, arg2);}, /expected .*? to deeply equal .*?/i);
                    assert.throws(() => {lib.assert.deepEqual(arg1, arg2, MESSAGE);}, MESSAGE_RE);
                });
                it(`assert.notDeepEqual(${insp(arg1)}, ${insp(arg2)}) does not throw`, () => {
                    lib.assert.notDeepEqual(arg1, arg2);
                    lib.assert.notDeepEqual(arg1, arg2, MESSAGE);
                });
            }
        });
    });


    // throws
    it('assert.throws is function', () => {
        assert.strictEqual(typeof lib.assert.throws, 'function');
    });

    it('assert.throws() accepts only functions as first arg', () => {
        assert.throws(() => {lib.assert.throws();}, /function/);
        assert.throws(() => {lib.assert.throws(false);}, /function/);
        assert.throws(() => {lib.assert.throws(null);}, /function/);
    });

    it('assert.throws(<fn>) throws', () => {
        assert.throws(() => {lib.assert.throws(() => null);});
    });

    it('assert.throws(<throwing fn>) does not throw', () => {
        lib.assert.throws(() => {throw new Error();});
    });

    ERROR_MATCH_FIXTURES.forEach(([err, exp]) => {
        it(`assert.throws(fn=>${insp(err)}, ${insp(exp)}) does not throw`, () => {
            lib.assert.throws(() => {throw err;}, exp);
            lib.assert.throws(() => {throw err;}, exp, MESSAGE);
        });
    });

    ERROR_NO_MATCH_FIXTURES.forEach(([err, exp]) => {
        it(`assert.throws(fn=>${insp(err)}, ${insp(exp)}) throws`, () => {
            assert.throws(() => {lib.assert.throws(() => {throw err;}, exp);});
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

    it('assert.rejects is function', () => {
        assert.strictEqual(typeof lib.assert.rejects, 'function');
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
