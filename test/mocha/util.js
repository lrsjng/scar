const {inspect: insp} = require('util');
const assert = require('assert');
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


describe('util', () => {
    it('util is object', () => {
        assert.strictEqual(typeof util, 'object');
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const exp = x[1] === 1;
        it(`util.isBoolean(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
            assert.strictEqual(util.isBoolean(arg), exp);
        });
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const exp = x[2] === 1;
        it(`util.isString(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
            assert.strictEqual(util.isString(arg), exp);
        });
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const exp = x[3] === 1;
        it(`util.isArray(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
            assert.strictEqual(util.isArray(arg), exp);
        });
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const exp = x[4] === 1;
        it(`util.isFn(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
            assert.strictEqual(util.isFn(arg), exp);
        });
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        const exp = x[5] === 1;
        it(`util.isPlainObject(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
            assert.strictEqual(util.isPlainObject(arg), exp);
        });
    });

    FIXTURES.forEach(x => {
        const arg = x[0];
        if (typeof arg === 'function') {
            it(`util.asFn(${insp(arg)} === ${insp(arg)}`, () => {
                assert.strictEqual(util.asFn(arg), arg);
            });
        } else {
            const res = util.asFn(arg);
            it(`util.asFn(${insp(arg)}) === () => ${insp(arg)}`, () => {
                assert.strictEqual(typeof res, 'function');
                if (Number.isNaN(arg)) {
                    assert.strictEqual(Number.isNaN(res()), true);
                } else {
                    assert.strictEqual(res(), arg);
                }
            });
        }
    });
});
