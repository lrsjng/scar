const {test, assert} = require('../../lib');
const {format_err} = require('../loader');

test('format_err is function', () => {
    assert.equal(typeof format_err, 'function');
});

test('format_err() throws', () => {
    assert.throws(() => format_err());
});

test('format_err(err, prefix) returns String', () => {
    const err = new Error();
    assert.equal(typeof format_err(err), 'string');
    assert.equal(format_err(err, ''), format_err(err));
    assert.ok(format_err(err, ' ') !== format_err(err));
});

test('format_err(err, prefix, short) returns String', () => {
    const err = new Error();
    assert.equal(typeof format_err(err), 'string');
    assert.equal(format_err(err, '', false), format_err(err));
});
