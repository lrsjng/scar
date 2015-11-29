const {test, assert, insp} = require('../../lib');
const {lib} = require('../loader');

/* eslint-disable no-multi-spaces */
// assert, ok, notOk
const FIXTURES = [
    [undefined,   1, 1, 0],
    [null,        1, 1, 0],
    [false,       1, 1, 0],
    [true,        0, 0, 1],
    [0,           1, 1, 0],
    [1,           0, 0, 1],
    ['',          1, 1, 0],
    [' ',         0, 0, 1],
    [[],          0, 0, 1],
    [[0],         0, 0, 1],
    [{},          0, 0, 1],
    [{a: 0},      0, 0, 1],
    [/a/,         0, 0, 1],
    [() => null,  0, 0, 1]
];
/* eslint-enable */

const THROWS_PASS_FIXTURES = [
    ['a', 'a'],
    ['a', /a/],
    [new Error('some message'), /some message/]
];

const THROWS_FAIL_FIXTURES = [
    ['ab', 'a'],
    ['a', /ab/],
    [new Error('some message'), 'some message']
];

const MESSAGE = 'test message';
const MESSAGE_RE = /test message/;

test('assert() is function', () => {
    assert.equal(typeof lib.assert, 'function');
});

FIXTURES.forEach(x => {
    const arg = x[0];
    const throws = x[1];

    if (throws) {
        test(`assert(${insp(arg)}) throws`, () => {
            assert.throws(() => {
                lib.assert(arg);
            }, /no error message/i);
        });

        test(`assert(${insp(arg)}, msg) throws`, () => {
            assert.throws(() => {
                lib.assert(arg, MESSAGE);
            }, MESSAGE_RE);
        });
    } else {
        test(`assert(${insp(arg)}) does not throw`, () => {
            lib.assert(arg);
        });

        test(`assert(${insp(arg)}, msg) does not throw`, () => {
            lib.assert(arg, MESSAGE);
        });
    }
});

test('assert.fail is function', () => {
    assert.equal(typeof lib.assert.fail, 'function');
});

test(`assert.fail(msg) throws`, () => {
    assert.throws(() => {
        lib.assert.fail(MESSAGE);
    }, MESSAGE_RE);
});

FIXTURES.forEach(x => {
    const arg = x[0];

    test(`assert.fail(${insp(arg)}) throws`, () => {
        assert.throws(() => {
            lib.assert.fail(arg);
        });
    });
});

test('assert.ok is function', () => {
    assert.equal(typeof lib.assert.ok, 'function');
});

FIXTURES.forEach(x => {
    const arg = x[0];
    const throws = x[2];

    if (throws) {
        test(`assert.ok(${insp(arg)}) throws`, () => {
            assert.throws(() => {
                lib.assert.ok(arg);
            }, /expected .*? to be truthy/i);
        });

        test(`assert.ok(${insp(arg)}, msg) throws`, () => {
            assert.throws(() => {
                lib.assert.ok(arg, MESSAGE);
            }, MESSAGE_RE);
        });
    } else {
        test(`assert.ok(${insp(arg)}) does not throw`, () => {
            lib.assert.ok(arg);
        });

        test(`assert.ok(${insp(arg)}, msg) does not throw`, () => {
            lib.assert.ok(arg, MESSAGE);
        });
    }
});

test('assert.notOk is function', () => {
    assert.equal(typeof lib.assert.notOk, 'function');
});

FIXTURES.forEach(x => {
    const arg = x[0];
    const throws = x[3];

    if (throws) {
        test(`assert.notOk(${insp(arg)}) throws`, () => {
            assert.throws(() => {
                lib.assert.notOk(arg);
            }, /expected .*? to be falsy/i);
        });

        test(`assert.notOk(${insp(arg)}, msg) throws`, () => {
            assert.throws(() => {
                lib.assert.notOk(arg, MESSAGE);
            }, MESSAGE_RE);
        });
    } else {
        test(`assert.notOk(${insp(arg)}) does not throw`, () => {
            lib.assert.notOk(arg);
        });

        test(`assert.notOk(${insp(arg)}, msg) does not throw`, () => {
            lib.assert.notOk(arg, MESSAGE);
        });
    }
});

test('assert.equal is function', () => {
    assert.equal(typeof lib.assert.equal, 'function');
});

FIXTURES.forEach(x => {
    const arg = x[0];

    FIXTURES.forEach(y => {
        const arg2 = y[0];

        if (arg === arg2) {
            test(`assert.equal(${insp(arg)}, ${insp(arg2)}) does not throw`, () => {
                lib.assert.equal(arg, arg2);
            });

            test(`assert.equal(${insp(arg)}, ${insp(arg2)}, msg) does not throw`, () => {
                lib.assert.equal(arg, arg2, MESSAGE);
            });
        } else {
            test(`assert.equal(${insp(arg)}, ${insp(arg2)}) throws`, () => {
                assert.throws(() => {
                    lib.assert.equal(arg, arg2);
                }, /expected .*? to be .*?/i);
            });

            test(`assert.equal(${insp(arg)}, ${insp(arg2)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert.equal(arg, arg2, MESSAGE);
                }, MESSAGE_RE);
            });
        }
    });
});

test('assert.notEqual is function', () => {
    assert.equal(typeof lib.assert.notEqual, 'function');
});

FIXTURES.forEach(x => {
    const arg = x[0];

    FIXTURES.forEach(y => {
        const arg2 = y[0];

        if (arg !== arg2) {
            test(`assert.notEqual(${insp(arg)}, ${insp(arg2)}) does not throw`, () => {
                lib.assert.notEqual(arg, arg2);
            });

            test(`assert.notEqual(${insp(arg)}, ${insp(arg2)}, msg) does not throw`, () => {
                lib.assert.notEqual(arg, arg2, MESSAGE);
            });
        } else {
            test(`assert.notEqual(${insp(arg)}, ${insp(arg2)}) throws`, () => {
                assert.throws(() => {
                    lib.assert.notEqual(arg, arg2);
                }, /expected .*? not to be .*?/i);
            });

            test(`assert.notEqual(${insp(arg)}, ${insp(arg2)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert.notEqual(arg, arg2, MESSAGE);
                }, MESSAGE_RE);
            });
        }
    });
});

test(`assert.throws(fn=>Error) does not throw`, () => {
    lib.assert.throws(() => {throw new Error();});
});

THROWS_PASS_FIXTURES.forEach(x => {
    const [err, exp] = x;

    test(`assert.throws(fn=>${insp(err)}, ${insp(exp)}) does not throw`, () => {
        lib.assert.throws(() => {
            throw err;
        }, exp);
    });

    test(`assert.throws(fn=>${insp(err)}, ${insp(exp)}, msg) does not throw`, () => {
        lib.assert.throws(() => {
            throw err;
        }, exp, MESSAGE);
    });
});

test(`assert.throws(fn) throws`, () => {
    assert.throws(() => {
        lib.assert.throws(() => {});
    });
});

THROWS_FAIL_FIXTURES.forEach(x => {
    const [err, exp] = x;

    test(`assert.throws(fn=>${insp(err)}, ${insp(exp)}) throws`, () => {
        assert.throws(() => {
            lib.assert.throws(() => {
                throw err;
            }, exp);
        });
    });

    test(`assert.throws(fn=>${insp(err)}, ${insp(exp)}, msg) throws`, () => {
        assert.throws(() => {
            lib.assert.throws(() => {
                throw err;
            }, exp, MESSAGE);
        });
    });
});
