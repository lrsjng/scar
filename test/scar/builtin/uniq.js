const {test, assert} = require('../../../lib');
const {lib} = require('../../loader');
const uniq = lib.uniq;

test('uniq', () => {
    assert.equal(typeof uniq, 'object', 'is object');
    assert.deep_equal(Object.keys(uniq).sort(), [
        'id',
        'is_id',
        'isId',
        'obj',
        'path'
    ].sort(), 'has the right properties');
});

test('uniq.id()', () => {
    assert.equal(typeof uniq.id, 'function', 'is function');
    assert.equal(uniq.id.length, 0, 'expects no arguments');
    assert.equal(typeof uniq.id(), 'string', 'returns string');
    assert.equal(uniq.id().length, 12, 'returns UNIQ-####-ID');
    assert.ok(uniq.id().match(/^UNIQ-\d{4}-ID$/), 'returns UNIQ-####-ID');

    const uid0 = parseInt(uniq.id().replace(/\D/g, ''), 10);
    for (let i = 1; i < 5; i += 1) {
        const uid = parseInt(uniq.id().replace(/\D/g, ''), 10);
        assert.equal(uid, uid0 + i, 'counts up');
    }

    assert.not_equal(uniq.id(), uniq.id(), 'not equal');
    assert.not_deep_equal(uniq.id(), uniq.id(), 'not deep equal');
});

test('uniq.is_id()', () => {
    assert.equal(typeof uniq.is_id, 'function', 'is function');
    assert.equal(uniq.is_id.length, 1);
    assert.equal(uniq.is_id, uniq.isId);

    [
        'UNIQ-0000-ID',
        'UNIQ-0001-ID',
        'UNIQ-0002-ID',
        'UNIQ-9999-ID'
    ].forEach(value => {
        assert.equal(uniq.is_id(value), true, `expected (${value}) -> true`);
    });

    [
        undefined,
        null,
        '',
        0,
        {},
        'UNIQID',
        'UNIQ-ID',
        'UNIQ--ID',
        'UNIQ-0-ID',
        'UNIQ-00-ID',
        'UNIQ-000-ID',
        'UNIQ-0000-IDx',
        'xUNIQ-0000-ID',
        'xUNIQ-0000-IDx',
        'UNIQ-000a-ID',
        'UNIQ-0000-IDUNIQ-0000-ID',
        'UNIQ-0000-ID UNIQ-0000-ID'
    ].forEach(value => {
        assert.equal(uniq.is_id(value), false, `expected (${value}) -> false`);
    });
});

test('uniq.obj()', () => {
    assert.equal(typeof uniq.obj, 'function', 'is function');
    assert.equal(typeof uniq.obj(), 'object', '() -> object');
    assert.equal(Object.keys(uniq.obj()).length, 1, '() -> one prop');
    assert.ok(uniq.is_id(uniq.obj()._uniq_id), '() -> _uniq_id');
    assert.not_equal(uniq.obj(), uniq.obj(), 'not equal');
    assert.not_deep_equal(uniq.obj(), uniq.obj(), 'not deep equal');
    assert.not_equal(uniq.obj()._uniq_id, uniq.obj()._uniq_id, '_uniq_id not equal');
    assert.not_deep_equal(uniq.obj()._uniq_id, uniq.obj()._uniq_id, '_uniq_id not deep equal');
});

test('uniq.path()', () => {
    assert.equal(typeof uniq.path, 'function', 'is function');
    assert.equal(typeof uniq.path(), 'string', '() -> string');
    assert.equal(uniq.path().length, 23, '() -> len');
    assert.ok(uniq.path().match(/^_uniq_path\/UNIQ-\d{4}-ID$/), '() -> match');
    assert.not_equal(uniq.path(), uniq.path(), 'not equal');
    assert.not_deep_equal(uniq.path(), uniq.path(), 'not deep equal');

    [
        '',
        '-',
        '0',
        'a',
        '.a',
        'a.',
        '.a.',
        '/',
        '//',
        'abc',
        '/abc',
        'abc/',
        '/abc/'
    ].forEach(value => {
        const msg = `(${value})`;
        const vlen = value.length;
        const res = uniq.path(value);
        assert.equal(typeof uniq.path(res), 'string', msg);
        assert.equal(res.length, 23 + vlen, msg);
        assert.ok(res.match(/^_uniq_path\/UNIQ-\d{4}-ID/), msg);
        assert.equal(vlen ? res.substr(-vlen) : '', value, msg);
    });
});
