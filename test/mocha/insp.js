const {inspect: insp} = require('util');
const assert = require('assert');
const {lib} = require('../loader');

const fnA = a1 => {}; // eslint-disable-line no-unused-vars
const fnB = (b1, b2) => {}; // eslint-disable-line no-unused-vars
function fnC(c1) {} // eslint-disable-line no-unused-vars
const obj = {fnD(d1, d2) {}}; // eslint-disable-line no-unused-vars

describe('insp', () => {
    it('insp is function', () => {
        assert.strictEqual(typeof lib.insp, 'function');
    });

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
        [fnA, 'function fnA(a1)'],
        [fnB, 'function fnB(b1, b2)'],
        [fnC, 'function fnC(c1)'],
        [obj.fnD, 'function fnD(d1, d2)'],
        [obj, '{fnD: function fnD(d1, d2)}']
    ].forEach(x => {
        const [arg, exp] = x;
        it(`insp(${insp(arg).substr(0, 20)}) === ${insp(exp)}`, () => {
            assert.strictEqual(lib.insp(arg), exp);
        });
    });
});
