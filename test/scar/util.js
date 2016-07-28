const {test, assert, insp} = require('../../lib');
const {util} = require('../loader');

/* eslint-disable no-unused-vars, no-array-constructor, no-new-object, no-multi-spaces */
const fnA = a1 => {};
const fnB = (b1, b2) => {};
function fnC(c1) {}
const obj = {fnD(d1, d2) {}};

// fixtures for is{Boolean, String, Array, Fn, PlainObject}
const FIXTURES = [
    [undefined,     0, 0, 0, 0, 0],
    [null,          0, 0, 0, 0, 0],
    [true,          1, 0, 0, 0, 0],
    [false,         1, 0, 0, 0, 0],
    [0,             0, 0, 0, 0, 0],
    [1,             0, 0, 0, 0, 0],
    ['',            0, 1, 0, 0, 0],
    [' ',           0, 1, 0, 0, 0],
    ['a',           0, 1, 0, 0, 0],
    [[],            0, 0, 1, 0, 0],
    [new Array(),   0, 0, 1, 0, 0],
    [[0],           0, 0, 1, 0, 0],
    [fnA,           0, 0, 0, 1, 0],
    [fnB,           0, 0, 0, 1, 0],
    [fnC,           0, 0, 0, 1, 0],
    [obj.fnD,       0, 0, 0, 1, 0],
    [{},            0, 0, 0, 0, 1],
    [new Object(),  0, 0, 0, 0, 1],
    [obj,           0, 0, 0, 0, 1],
    [{a: 1},        0, 0, 0, 0, 1],
    [{b: false},    0, 0, 0, 0, 1],
    [/a/,           0, 0, 0, 0, 0],
    [NaN,           0, 0, 0, 0, 0]
];
/* eslint-enable */


test('util', () => {
    assert.equal(typeof util, 'object', 'is object');
});

test('util.isBoolean()', () => {
    assert.equal(typeof util.isBoolean, 'function', 'is function');

    FIXTURES.forEach((x, idx) => {
        const arg = x[0];
        const exp = x[1] === 1;
        const msg = `FIX[${idx}]: expected (${insp(arg).substr(0, 20)}) -> ${insp(exp)}`;
        assert.equal(util.isBoolean(arg), exp, msg);
    });
});

test('util.isString()', () => {
    assert.equal(typeof util.isString, 'function', 'is function');

    FIXTURES.forEach((x, idx) => {
        const arg = x[0];
        const exp = x[2] === 1;
        const msg = `FIX[${idx}]: expected (${insp(arg).substr(0, 20)}) -> ${insp(exp)}`;
        assert.equal(util.isString(arg), exp, msg);
    });
});

test('util.isArray()', () => {
    assert.equal(typeof util.isArray, 'function', 'is function');

    FIXTURES.forEach((x, idx) => {
        const arg = x[0];
        const exp = x[3] === 1;
        const msg = `FIX[${idx}]: expected (${insp(arg).substr(0, 20)}) -> ${insp(exp)}`;
        assert.equal(util.isArray(arg), exp, msg);
    });
});

test('util.isFn()', () => {
    assert.equal(typeof util.isFn, 'function', 'is function');

    FIXTURES.forEach((x, idx) => {
        const arg = x[0];
        const exp = x[4] === 1;
        const msg = `FIX[${idx}]: expected (${insp(arg).substr(0, 20)}) -> ${insp(exp)}`;
        assert.equal(util.isFn(arg), exp, msg);
    });
});

test('util.isPlainObject()', () => {
    assert.equal(typeof util.isPlainObject, 'function', 'is function');

    FIXTURES.forEach((x, idx) => {
        const arg = x[0];
        const exp = x[5] === 1;
        const msg = `FIX[${idx}]: expected (${insp(arg).substr(0, 20)}) -> ${insp(exp)}`;
        assert.equal(util.isPlainObject(arg), exp, msg);
    });
});

test('util.asFn()', () => {
    assert.equal(typeof util.asFn, 'function', 'is function');

    FIXTURES.forEach(([arg,], idx) => { // eslint-disable-line comma-dangle,comma-spacing
        if (typeof arg === 'function') {
            const msg = `FIX[${idx}]: expected (${insp(arg)}) -> ${insp(arg)}`;
            assert.equal(util.asFn(arg), arg, msg);
        } else {
            const msg = `FIX[${idx}]: expected (${insp(arg)}) -> () => ${insp(arg)}`;
            const res = util.asFn(arg);
            assert.equal(typeof res, 'function', msg);
            if (Number.isNaN(arg)) {
                assert.equal(Number.isNaN(res()), true, msg);
            } else {
                assert.equal(res(), arg, msg);
            }
        }
    });
});
