const {test, assert} = require('../../lib');
const {lib} = require('../loader');

test('lib', () => {
    assert.equal(typeof lib, 'object', 'is object');

    const act = Object.keys(lib).sort();
    const exp = ['scar', 'test', 'assert', 'insp', 'spy', 'uniq'].sort();
    assert.deep_equal(act, exp);
});
