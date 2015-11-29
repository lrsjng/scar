const {test, assert, insp} = require('../../lib');
const {util} = require('../loader');

const fnA = a1 => {}; // eslint-disable-line no-unused-vars
const fnB = (b1, b2) => {}; // eslint-disable-line no-unused-vars
function fnC(c1) {} // eslint-disable-line no-unused-vars
const obj = {fnD(d1, d2) {}}; // eslint-disable-line no-unused-vars


// fixtures for is{Boolean, String, Array, Fn, PlainObject}
const IS_FIXTURES = [
    [undefined, 0, 0, 0, 0, 0],
    [null, 0, 0, 0, 0, 0],
    [true, 1, 0, 0, 0, 0],
    [false, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    ['', 0, 1, 0, 0, 0],
    [' ', 0, 1, 0, 0, 0],
    ['a', 0, 1, 0, 0, 0],
    [[], 0, 0, 1, 0, 0],
    [new Array(), 0, 0, 1, 0, 0], // eslint-disable-line no-array-constructor
    [[0], 0, 0, 1, 0, 0],
    [fnA, 0, 0, 0, 1, 0],
    [fnB, 0, 0, 0, 1, 0],
    [fnC, 0, 0, 0, 1, 0],
    [obj.fnD, 0, 0, 0, 1, 0],
    [{}, 0, 0, 0, 0, 1],
    [new Object(), 0, 0, 0, 0, 1], // eslint-disable-line no-new-object
    [obj, 0, 0, 0, 0, 1],
    [{a: 1}, 0, 0, 0, 0, 1],
    [{b: false}, 0, 0, 0, 0, 1],
    [/a/, 0, 0, 0, 0, 0],
    [NaN, 0, 0, 0, 0, 0]
];


test('util is object', () => {
    assert.equal(typeof util, 'object');
});

IS_FIXTURES.forEach(x => {
    const arg = x[0];
    const exp = x[1] === 1;
    test(`util.isBoolean(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
        assert.equal(util.isBoolean(arg), exp);
    });
});

IS_FIXTURES.forEach(x => {
    const arg = x[0];
    const exp = x[2] === 1;
    test(`util.isString(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
        assert.equal(util.isString(arg), exp);
    });
});

IS_FIXTURES.forEach(x => {
    const arg = x[0];
    const exp = x[3] === 1;
    test(`util.isArray(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
        assert.equal(util.isArray(arg), exp);
    });
});

IS_FIXTURES.forEach(x => {
    const arg = x[0];
    const exp = x[4] === 1;
    test(`util.isFn(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
        assert.equal(util.isFn(arg), exp);
    });
});

IS_FIXTURES.forEach(x => {
    const arg = x[0];
    const exp = x[5] === 1;
    test(`util.isPlainObject(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
        assert.equal(util.isPlainObject(arg), exp);
    });
});

IS_FIXTURES.forEach(x => {
    const arg = x[0];
    if (typeof arg === 'function') {
        test(`util.asFn(${insp(arg)} === ${insp(arg)}`, () => {
            assert.equal(util.asFn(arg), arg);
        });
    } else {
        const res = util.asFn(arg);
        test(`util.asFn(${insp(arg)}) === () => ${insp(arg)}`, () => {
            assert.equal(typeof res, 'function');
            if (Number.isNaN(arg)) {
                assert.equal(Number.isNaN(res()), true);
            } else {
                assert.equal(res(), arg);
            }
        });
    }
});
