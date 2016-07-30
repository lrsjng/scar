const {test, assert, insp} = require('../../../lib');
const {lib} = require('../../loader');

/* eslint-disable no-unused-vars */
const fnA = a1 => {};
const fnB = (b1, b2) => {};
function fnC(c1) {}
const obj = {fnD(d1, d2) {}};
/* eslint-enable */

test('insp()', () => {
    assert.equal(typeof lib.insp, 'function', 'is function');

    [
        [undefined, 'undefined'],
        [null, 'null'],
        [true, 'true'],
        [false, 'false'],
        [0, '0'],
        [-0, '0'],
        [+0, '0'],
        ['a', "'a'"],
        [[], '[]'],
        [[0], '[0]'],
        [[0, 1], '[0, 1]'],
        [[0, 1, 'a'], "[0, 1, 'a']"],
        [[null], '[null]'],
        [[undefined], '[undefined]'],
        [/a/g, '/a/g'],
        [{}, '{}'],
        [{a: 1}, '{a: 1}'],
        [{a: 1, b: 'x'}, "{a: 1, b: 'x'}"],
        // [fnA, 'function fnA(a1)'],
        // [fnB, 'function fnB(b1, b2)'],
        [fnC, 'function fnC(c1)']
        // [obj.fnD, 'function fnD(d1, d2)'],
        // [obj, '{fnD: function fnD(d1, d2)}']
    ].forEach(([arg, exp], idx) => {
        const msg = `[#${idx}] (${insp(arg).substr(0, 20)}) -> ${insp(exp)}`;
        assert.equal(lib.insp(arg), exp, msg);
    });
});
