const {test, assert} = require('../../lib');
const {lib} = require('../loader');

test('lib is object', () => {
    assert.equal(typeof lib, 'object');
});

test('lib has the right props', () => {
    const act = Object.keys(lib).sort();
    const exp = ['Scar', 'assert', 'insp', 'spy', 'test', 'uniq'].sort();
    assert.equal(act.length, exp.length);
    act.forEach((_, idx) => assert.equal(act[idx], exp[idx]));
});
