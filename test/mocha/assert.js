const {inspect: insp} = require('util');
const assert = require('assert');
const {lib} = require('../loader');

// assert, ok, notOk
const FIXTURES = [
    [undefined, 1, 1, 0],
    [null, 1, 1, 0],
    [false, 1, 1, 0],
    [true, 0, 0, 1],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    ['', 1, 1, 0],
    [' ', 0, 0, 1],
    [[], 0, 0, 1],
    [[0], 0, 0, 1],
    [{}, 0, 0, 1],
    [{a: 0}, 0, 0, 1],
    [/a/, 0, 0, 1],
    [() => null, 0, 0, 1]
];

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

describe('assert', () => {
    it('assert is function', () => {
        assert.strictEqual(typeof lib.assert, 'function');
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const throws = x[1];

        if (throws) {
            it(`assert(${insp(arg)}) throws`, () => {
                assert.throws(() => {
                    lib.assert(arg);
                }, /no error message/i);
            });

            it(`assert(${insp(arg)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert(arg, MESSAGE);
                }, MESSAGE_RE);
            });
        } else {
            it(`assert(${insp(arg)}) does not throw`, () => {
                lib.assert(arg);
            });

            it(`assert(${insp(arg)}, msg) does not throw`, () => {
                lib.assert(arg, MESSAGE);
            });
        }
    });

    it('assert.fail is function', () => {
        assert.strictEqual(typeof lib.assert.fail, 'function');
    });

    it(`assert.fail(msg) throws`, () => {
        assert.throws(() => {
            lib.assert.fail(MESSAGE);
        }, MESSAGE_RE);
    });

    FIXTURES.forEach(x => {
        const arg = x[0];

        it(`assert.fail(${insp(arg)}) throws`, () => {
            assert.throws(() => {
                lib.assert.fail(arg);
            });
        });
    });

    it('assert.ok is function', () => {
        assert.strictEqual(typeof lib.assert.ok, 'function');
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const throws = x[2];

        if (throws) {
            it(`assert.ok(${insp(arg)}) throws`, () => {
                assert.throws(() => {
                    lib.assert.ok(arg);
                }, /expected .*? to be truthy/i);
            });

            it(`assert.ok(${insp(arg)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert.ok(arg, MESSAGE);
                }, MESSAGE_RE);
            });
        } else {
            it(`assert.ok(${insp(arg)}) does not throw`, () => {
                lib.assert.ok(arg);
            });

            it(`assert.ok(${insp(arg)}, msg) does not throw`, () => {
                lib.assert.ok(arg, MESSAGE);
            });
        }
    });

    it('assert.notOk is function', () => {
        assert.strictEqual(typeof lib.assert.notOk, 'function');
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const throws = x[3];

        if (throws) {
            it(`assert.notOk(${insp(arg)}) throws`, () => {
                assert.throws(() => {
                    lib.assert.notOk(arg);
                }, /expected .*? to be falsy/i);
            });

            it(`assert.notOk(${insp(arg)}, msg) throws`, () => {
                assert.throws(() => {
                    lib.assert.notOk(arg, MESSAGE);
                }, MESSAGE_RE);
            });
        } else {
            it(`assert.notOk(${insp(arg)}) does not throw`, () => {
                lib.assert.notOk(arg);
            });

            it(`assert.notOk(${insp(arg)}, msg) does not throw`, () => {
                lib.assert.notOk(arg, MESSAGE);
            });
        }
    });

    it('assert.equal is function', () => {
        assert.strictEqual(typeof lib.assert.equal, 'function');
    });

    FIXTURES.forEach(x => {
        const arg = x[0];

        FIXTURES.forEach(y => {
            const arg2 = y[0];

            if (arg === arg2) {
                it(`assert.equal(${insp(arg)}, ${insp(arg2)}) does not throw`, () => {
                    lib.assert.equal(arg, arg2);
                });

                it(`assert.equal(${insp(arg)}, ${insp(arg2)}, msg) does not throw`, () => {
                    lib.assert.equal(arg, arg2, MESSAGE);
                });
            } else {
                it(`assert.equal(${insp(arg)}, ${insp(arg2)}) throws`, () => {
                    assert.throws(() => {
                        lib.assert.equal(arg, arg2);
                    }, /expected .*? to be .*?/i);
                });

                it(`assert.equal(${insp(arg)}, ${insp(arg2)}, msg) throws`, () => {
                    assert.throws(() => {
                        lib.assert.equal(arg, arg2, MESSAGE);
                    }, MESSAGE_RE);
                });
            }
        });
    });

    it('assert.notEqual is function', () => {
        assert.strictEqual(typeof lib.assert.notEqual, 'function');
    });

    FIXTURES.forEach(x => {
        const arg = x[0];

        FIXTURES.forEach(y => {
            const arg2 = y[0];

            if (arg !== arg2) {
                it(`assert.notEqual(${insp(arg)}, ${insp(arg2)}) does not throw`, () => {
                    lib.assert.notEqual(arg, arg2);
                });

                it(`assert.notEqual(${insp(arg)}, ${insp(arg2)}, msg) does not throw`, () => {
                    lib.assert.notEqual(arg, arg2, MESSAGE);
                });
            } else {
                it(`assert.notEqual(${insp(arg)}, ${insp(arg2)}) throws`, () => {
                    assert.throws(() => {
                        lib.assert.notEqual(arg, arg2);
                    }, /expected .*? not to be .*?/i);
                });

                it(`assert.notEqual(${insp(arg)}, ${insp(arg2)}, msg) throws`, () => {
                    assert.throws(() => {
                        lib.assert.notEqual(arg, arg2, MESSAGE);
                    }, MESSAGE_RE);
                });
            }
        });
    });

    it(`assert.throws(fn=>Error) does not throw`, () => {
        lib.assert.throws(() => {throw new Error();});
    });

    THROWS_PASS_FIXTURES.forEach(x => {
        const [err, exp] = x;

        it(`assert.throws(fn=>${insp(err)}, ${insp(exp)}) does not throw`, () => {
            lib.assert.throws(() => {
                throw err;
            }, exp);
        });

        it(`assert.throws(fn=>${insp(err)}, ${insp(exp)}, msg) does not throw`, () => {
            lib.assert.throws(() => {
                throw err;
            }, exp, MESSAGE);
        });
    });

    it(`assert.throws(fn) throws`, () => {
        assert.throws(() => {
            lib.assert.throws(() => {});
        });
    });

    THROWS_FAIL_FIXTURES.forEach(x => {
        const [err, exp] = x;

        it(`assert.throws(fn=>${insp(err)}, ${insp(exp)}) throws`, () => {
            assert.throws(() => {
                lib.assert.throws(() => {
                    throw err;
                }, exp);
            });
        });

        it(`assert.throws(fn=>${insp(err)}, ${insp(exp)}, msg) throws`, () => {
            assert.throws(() => {
                lib.assert.throws(() => {
                    throw err;
                }, exp, MESSAGE);
            });
        });
    });
});
