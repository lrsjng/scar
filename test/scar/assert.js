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
    [new Error('some message'), /some message/]
];

const ERROR_NO_MATCH_FIXTURES = [
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
            }, /no message/i);
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
                }, /expected .*? to equal .*?/i);
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
                }, /expected .*? not to equal .*?/i);
            });

            test(`assert.notEqual(${insp(arg)}, ${insp(arg2)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert.notEqual(arg, arg2, MESSAGE);
                }, MESSAGE_RE);
            });
        }
    });
});

test('assert.deepEqual is function', () => {
    assert.equal(typeof lib.assert.deepEqual, 'function');
});

DEEP_FIXTURES.forEach(x => {
    const [arg1, group1] = x;

    DEEP_FIXTURES.forEach(y => {
        const [arg2, group2] = y;

        if (group1 === group2) {
            test(`assert.deepEqual(${insp(arg1)}, ${insp(arg2)}) does not throw`, () => {
                lib.assert.deepEqual(arg1, arg2);
            });

            test(`assert.deepEqual(${insp(arg1)}, ${insp(arg2)}, msg) does not throw`, () => {
                lib.assert.deepEqual(arg1, arg2, MESSAGE);
            });
        } else {
            test(`assert.deepEqual(${insp(arg1)}, ${insp(arg2)}) throws`, () => {
                assert.throws(() => {
                    lib.assert.deepEqual(arg1, arg2);
                }, /expected .*? to deeply equal .*?/i);
            });

            test(`assert.deepEqual(${insp(arg1)}, ${insp(arg2)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert.deepEqual(arg1, arg2, MESSAGE);
                }, MESSAGE_RE);
            });
        }
    });
});

test('assert.notDeepEqual is function', () => {
    assert.equal(typeof lib.assert.notDeepEqual, 'function');
});

DEEP_FIXTURES.forEach(x => {
    const [arg1, group1] = x;

    DEEP_FIXTURES.forEach(y => {
        const [arg2, group2] = y;

        if (group1 !== group2) {
            test(`assert.notDeepEqual(${insp(arg1)}, ${insp(arg2)}) does not throw`, () => {
                lib.assert.notDeepEqual(arg1, arg2);
            });

            test(`assert.notDeepEqual(${insp(arg1)}, ${insp(arg2)}, msg) does not throw`, () => {
                lib.assert.notDeepEqual(arg1, arg2, MESSAGE);
            });
        } else {
            test(`assert.notDeepEqual(${insp(arg1)}, ${insp(arg2)}) throws`, () => {
                assert.throws(() => {
                    lib.assert.notDeepEqual(arg1, arg2);
                }, /expected .*? not to deeply equal .*?/i);
            });

            test(`assert.notDeepEqual(${insp(arg1)}, ${insp(arg2)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert.notDeepEqual(arg1, arg2, MESSAGE);
                }, MESSAGE_RE);
            });
        }
    });
});

test(`assert.throws(fn=>Error) does not throw`, () => {
    lib.assert.throws(() => {throw new Error();});
});

ERROR_MATCH_FIXTURES.forEach(x => {
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

ERROR_NO_MATCH_FIXTURES.forEach(x => {
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

test(`assert.rejects(Promise.reject(new Error())) resolves`, () => {
    return lib.assert.rejects(Promise.reject(new Error()));
});

ERROR_MATCH_FIXTURES.forEach(x => {
    const [err, exp] = x;

    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}) resolves`, () => {
        return lib.assert.rejects(Promise.reject(err), exp);
    });

    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}, msg) resolves`, () => {
        return lib.assert.rejects(Promise.reject(err), exp, MESSAGE);
    });
});

const flip = promise => {
    return promise.then(
        () => {throw new Error('should reject');},
        () => {/* consume error */}
    );
};

test(`assert.rejects() rejects`, () => {
    return flip(lib.assert.rejects());
});

test(`assert.rejects(Promise.resolve()) rejects`, () => {
    return flip(lib.assert.rejects(Promise.resolve()));
});

test(`assert.rejects(false) rejects`, () => {
    return flip(lib.assert.rejects(false));
});

test(`assert.rejects(null) rejects`, () => {
    return flip(lib.assert.rejects(null));
});

ERROR_NO_MATCH_FIXTURES.forEach(x => {
    const [err, exp] = x;

    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}) rejects`, () => {
        return flip(lib.assert.rejects(Promise.reject(err), exp));
    });

    test(`assert.rejects(Promise.reject(${insp(err)}), ${insp(exp)}, msg) rejects`, () => {
        return flip(lib.assert.rejects(Promise.reject(err), exp, MESSAGE));
    });
});
