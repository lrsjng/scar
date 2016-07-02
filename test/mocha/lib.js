const assert = require('assert');
const {lib} = require('../loader');

describe('lib', () => {
    it('lib is object', () => {
        assert.strictEqual(typeof lib, 'object');
    });

    it('lib has the right props', () => {
        const act = Object.keys(lib).sort();
        const exp = ['Scar', 'assert', 'insp', 'spy', 'test', 'uniq'].sort();
        assert.strictEqual(act.length, exp.length);
        act.forEach((_, idx) => assert.strictEqual(act[idx], exp[idx]));
    });
});
