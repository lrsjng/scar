const {test, assert} = require('../../lib');
const {lib} = require('../loader');
const uniq = lib.uniq;

test('uniq is object', () => {
    assert.equal(typeof uniq, 'object');
});

test('uniq has the right properties', () => {
    assert.deepEqual(Object.keys(uniq).sort(), [
        'id',
        'isId',
        'obj',
        'path'
    ].sort());
});

test('uniq.id() is function', () => {
    assert.equal(typeof uniq.id, 'function');
});

test('uniq.id() expects no arguments', () => {
    assert.equal(uniq.id.length, 0);
});

test('uniq.id() returns string', () => {
    assert.equal(typeof uniq.id(), 'string');
});

test('uniq.id() returns UNIQ-####-ID', () => {
    assert.equal(uniq.id().length, 12);
    assert.ok(uniq.id().match(/^UNIQ-\d{4}-ID$/));
});

test('uniq.id() counts up', () => {
    const uid0 = parseInt(uniq.id().replace(/\D/g, ''), 10);
    let i;
    let uid;

    for (i = 1; i < 10; i += 1) {
        uid = parseInt(uniq.id().replace(/\D/g, ''), 10);
        assert.equal(uid, uid0 + i);
    }
});

test('uniq.id() not equal', () => {
    assert.notEqual(uniq.id(), uniq.id());
    assert.notDeepEqual(uniq.id(), uniq.id());
});


test('uniq.isId() is function', () => {
    assert.equal(typeof uniq.isId, 'function');
});

test('uniq.isId() expects 1 argument', () => {
    assert.equal(uniq.isId.length, 1);
});

[
    'UNIQ-0000-ID',
    'UNIQ-0001-ID',
    'UNIQ-0002-ID',
    'UNIQ-9999-ID'
].forEach(value => {
    test('uniq.isId() returns true for ' + value, () => {
        assert.ok(uniq.isId(value));
    });
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
    test('uniq.isId() returns false for ' + value, () => {
        assert.ok(!uniq.isId(value));
    });
});


test('uniq.obj() is function', () => {
    assert.equal(typeof uniq.obj, 'function');
});

test('uniq.obj() expects no arguments', () => {
    assert.equal(uniq.obj.length, 0);
});

test('uniq.obj() returns object with single property ._uniq_id', () => {
    assert.equal(typeof uniq.obj(), 'object');
    assert.equal(Object.keys(uniq.obj()).length, 1);
    assert.ok(uniq.isId(uniq.obj()._uniq_id));
});

test('uniq.obj() ._uniq_id is UNIQ-####-ID', () => {
    assert.equal(uniq.obj()._uniq_id.length, 12);
    assert.ok(uniq.obj()._uniq_id.match(/^UNIQ-\d{4}-ID$/));
});

test('uniq.obj() ._uniq_id not equal', () => {
    assert.notEqual(uniq.obj()._uniq_id, uniq.obj()._uniq_id);
    assert.notDeepEqual(uniq.obj()._uniq_id, uniq.obj()._uniq_id);
});

test('uniq.obj() not equal', () => {
    assert.notEqual(uniq.obj(), uniq.obj());
    assert.notDeepEqual(uniq.obj(), uniq.obj());
});


test('uniq.path() is function', () => {
    assert.equal(typeof uniq.path, 'function');
});

test('uniq.path() returns string', () => {
    assert.equal(typeof uniq.path(), 'string');
});

test('uniq.path() returns /uniq/path/UNIQ-####-ID', () => {
    assert.equal(uniq.path().length, 23);
    assert.ok(uniq.path().match(/^_uniq_path\/UNIQ-\d{4}-ID$/));
});

test('uniq.path() not equal', () => {
    assert.notEqual(uniq.path(), uniq.path());
    assert.notDeepEqual(uniq.path(), uniq.path());
});

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
    test('uniq.path() suffix ' + value, () => {
        const len = value.length;
        const path = uniq.path(value);
        assert.equal(path.length, 23 + len);
        assert.ok(path.match(/^_uniq_path\/UNIQ-\d{4}-ID/));
        assert.equal(len ? path.substr(-len) : '', value);
    });
});
