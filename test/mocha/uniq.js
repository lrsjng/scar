const assert = require('assert');
const {lib} = require('../loader');
const uniq = lib.uniq;

describe('uniq', () => {
    it('is object', () => {
        assert.strictEqual(typeof uniq, 'object');
    });

    it('has the right properties', () => {
        assert.deepEqual(Object.keys(uniq).sort(), [
            'id',
            'isId',
            'obj',
            'path'
        ].sort());
    });

    describe('.id()', () => {
        it('is function', () => {
            assert.strictEqual(typeof uniq.id, 'function');
        });

        it('expects no arguments', () => {
            assert.strictEqual(uniq.id.length, 0);
        });

        it('returns string', () => {
            assert.strictEqual(typeof uniq.id(), 'string');
        });

        it('returns UNIQ-####-ID', () => {
            assert.strictEqual(uniq.id().length, 12);
            assert.ok(uniq.id().match(/^UNIQ-\d{4}-ID$/));
        });

        it('counts up', () => {
            const uid0 = parseInt(uniq.id().replace(/\D/g, ''), 10);
            let i;
            let uid;

            for (i = 1; i < 10; i += 1) {
                uid = parseInt(uniq.id().replace(/\D/g, ''), 10);
                assert.strictEqual(uid, uid0 + i);
            }
        });

        it('not equal', () => {
            assert.notEqual(uniq.id(), uniq.id());
            assert.notDeepEqual(uniq.id(), uniq.id());
        });
    });

    describe('.isId()', () => {
        it('is function', () => {
            assert.strictEqual(typeof uniq.isId, 'function');
        });

        it('expects 1 argument', () => {
            assert.strictEqual(uniq.isId.length, 1);
        });

        [
            'UNIQ-0000-ID',
            'UNIQ-0001-ID',
            'UNIQ-0002-ID',
            'UNIQ-9999-ID'
        ].forEach(value => {
            it('returns true for ' + value, () => {
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
            it('returns false for ' + value, () => {
                assert.ok(!uniq.isId(value));
            });
        });
    });

    describe('.obj()', () => {
        it('is function', () => {
            assert.strictEqual(typeof uniq.obj, 'function');
        });

        it('expects no arguments', () => {
            assert.strictEqual(uniq.obj.length, 0);
        });

        it('returns object with single property ._uniq_id', () => {
            assert.strictEqual(typeof uniq.obj(), 'object');
            assert.strictEqual(Object.keys(uniq.obj()).length, 1);
            assert.ok(uniq.isId(uniq.obj()._uniq_id));
        });

        it('._uniq_id is UNIQ-####-ID', () => {
            assert.strictEqual(uniq.obj()._uniq_id.length, 12);
            assert.ok(uniq.obj()._uniq_id.match(/^UNIQ-\d{4}-ID$/));
        });

        it('._uniq_id not equal', () => {
            assert.notEqual(uniq.obj()._uniq_id, uniq.obj()._uniq_id);
            assert.notDeepEqual(uniq.obj()._uniq_id, uniq.obj()._uniq_id);
        });

        it('not equal', () => {
            assert.notEqual(uniq.obj(), uniq.obj());
            assert.notDeepEqual(uniq.obj(), uniq.obj());
        });
    });

    describe('.path()', () => {
        it('is function', () => {
            assert.strictEqual(typeof uniq.path, 'function');
        });

        it('returns string', () => {
            assert.strictEqual(typeof uniq.path(), 'string');
        });

        it('returns /uniq/path/UNIQ-####-ID', () => {
            assert.strictEqual(uniq.path().length, 23);
            assert.ok(uniq.path().match(/^_uniq_path\/UNIQ-\d{4}-ID$/));
        });

        it('not equal', () => {
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
            it('suffix ' + value, () => {
                const len = value.length;
                const path = uniq.path(value);
                assert.strictEqual(path.length, 23 + len);
                assert.ok(path.match(/^_uniq_path\/UNIQ-\d{4}-ID/));
                assert.strictEqual(len ? path.substr(-len) : '', value);
            });
        });
    });
});
