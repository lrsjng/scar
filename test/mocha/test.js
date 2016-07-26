const assert = require('assert');
const {pto, Test} = require('../loader');

const noop = () => null;

describe('Test', () => {
    it('Test is function', () => {
        assert.strictEqual(typeof Test, 'function');
    });

    [
        'WAITING',
        'PENDING',
        'PASSED',
        'FAILED',
        'SKIPPED'
    ].forEach(status => {
        it(`Test.${status} === '${status}'`, () => {
            assert.strictEqual(Test[status], status);
        });
    });

    it('Test()', () => {
        const inst = Test();
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, '[No Description]');
        assert.strictEqual(inst.fn, null);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test(desc)', () => {
        const desc = 'some desc';
        const inst = Test(desc);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, null);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test(fn)', () => {
        const fn = () => null;
        const inst = Test(fn);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, '[No Description]');
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test(desc, fn)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const inst = Test(desc, fn);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test(fn, desc)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const inst = Test(fn, desc);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test({})', () => {
        const inst = Test({});
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, '[No Description]');
        assert.strictEqual(inst.fn, null);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test({desc})', () => {
        const desc = 'some desc';
        const obj = {desc};
        const inst = Test(obj);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, null);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test({fn})', () => {
        const fn = () => null;
        const obj = {fn};
        const inst = Test(obj);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, '[No Description]');
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test({desc, fn})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const obj = {desc, fn};
        const inst = Test(obj);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test({desc, fn, ...})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {desc, fn, other};
        const inst = Test(obj);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test(desc, fn, {...})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(desc, fn, obj);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test(desc, fn, {...}, ...)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(desc, fn, obj, true);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test(fn, desc, {...})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(fn, desc, obj);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test(desc, {...}, fn)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(desc, obj, fn);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test(fn, {...}, desc)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(fn, obj, desc);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test({...}, desc, fn)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(obj, desc, fn);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test({...}, fn, desc)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(obj, fn, desc);
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 11);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Test({timeout: 0})', () => {
        const timeout = 0;
        const inst = Test({timeout});
        assert.ok(inst);
        // assert.ok(inst instanceof Test);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.desc, '[No Description]');
        assert.strictEqual(inst.fn, null);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, timeout);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Test(...).run() no tests', () => {
        const inst = Test();
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() passing', () => {
        const inst = Test(noop);
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() passing async', () => {
        const inst = Test(() => pto(10));
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() failing', () => {
        const err = new Error();
        const inst = Test(() => {
            throw err;
        });
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.FAILED);
            assert.strictEqual(inst.err, err);
        });
    });

    it('Test(...).run() failing async', () => {
        const err = new Error();
        const inst = Test(() => pto(10, err));
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.FAILED);
            assert.strictEqual(inst.err, err);
        });
    });

    it('Test(...).run() skip passing', () => {
        const inst = Test(noop, {skip: true});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.SKIPPED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() skip passing async', () => {
        const inst = Test(() => pto(10), {skip: true});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.SKIPPED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() skip failing', () => {
        const err = new Error();
        const inst = Test(() => {
            throw err;
        }, {skip: true});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.SKIPPED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() skip failing async', () => {
        const err = new Error();
        const inst = Test(() => pto(10, err), {skip: true});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.SKIPPED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() sync', () => {
        const inst = Test(noop, {sync: true});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() not timed out', () => {
        const inst = Test(() => pto(10), {timeout: 100});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(inst.err, null);
        });
    });

    it('Test(...).run() timed out', () => {
        const inst = Test(() => pto(100), {timeout: 10});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.FAILED);
            assert.ok(inst.err);
            assert.ok(inst.err.message);
            assert.ok(/Timeout/.test(inst.err.message));
        });
    });

    it('Test(...).run() no timeout', () => {
        const inst = Test(() => pto(10), {timeout: 0});
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(inst.err, null);
        });
    });
});
