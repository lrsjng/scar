const {test, assert} = require('../../lib');
const {Test, promised_timeout} = require('../loader');

const noop = () => null;

test('Test()', () => {
    assert.equal(typeof Test, 'function');

    [
        'WAITING',
        'PENDING',
        'PASSED',
        'FAILED',
        'SKIPPED'
    ].forEach(status => {
        assert.equal(Test[status], status, `[${status}]`);
    });
});

test('Test()', () => {
    const inst = new Test();
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, '[No Description]');
    assert.equal(inst.fn, null);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test(desc)', () => {
    const desc = 'some desc';
    const inst = new Test(desc);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, null);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test(fn)', () => {
    const fn = () => null;
    const inst = new Test(fn);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, '[No Description]');
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test(desc, fn)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const inst = new Test(desc, fn);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test(fn, desc)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const inst = new Test(fn, desc);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test({})', () => {
    const inst = new Test({});
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, '[No Description]');
    assert.equal(inst.fn, null);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test({desc})', () => {
    const desc = 'some desc';
    const obj = {desc};
    const inst = new Test(obj);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, null);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test({fn})', () => {
    const fn = () => null;
    const obj = {fn};
    const inst = new Test(obj);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, '[No Description]');
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test({desc, fn})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const obj = {desc, fn};
    const inst = new Test(obj);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test({desc, fn, ...})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {desc, fn, other};
    const inst = new Test(obj);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test(desc, fn, {...})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = new Test(desc, fn, obj);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test(desc, fn, {...}, ...)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = new Test(desc, fn, obj, true);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test(fn, desc, {...})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = new Test(fn, desc, obj);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test(desc, {...}, fn)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = new Test(desc, obj, fn);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test(fn, {...}, desc)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = new Test(fn, obj, desc);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test({...}, desc, fn)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = new Test(obj, desc, fn);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test({...}, fn, desc)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = new Test(obj, fn, desc);
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 11);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Test({timeout: 0})', () => {
    const timeout = 0;
    const inst = new Test({timeout});
    assert.ok(inst);
    assert.ok(inst instanceof Test);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.desc, '[No Description]');
    assert.equal(inst.fn, null);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, timeout);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.err, null);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Test(...).run() no tests', () => {
    const inst = new Test();
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() passing', () => {
    const inst = new Test(noop);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() passing async', () => {
    const inst = new Test(() => promised_timeout(10));
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() failing', () => {
    const err = new Error();
    const inst = new Test(() => {
        throw err;
    });
    return inst.run().then(() => {
        assert.equal(inst.status, Test.FAILED);
        assert.equal(inst.err, err);
    });
});

test('Test(...).run() failing async', () => {
    const err = new Error();
    const inst = new Test(() => promised_timeout(10, err));
    return inst.run().then(() => {
        assert.equal(inst.status, Test.FAILED);
        assert.equal(inst.err, err);
    });
});

test('Test(...).run() skip passing', () => {
    const inst = new Test(noop, {skip: true});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.SKIPPED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() skip passing async', () => {
    const inst = new Test(() => promised_timeout(10), {skip: true});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.SKIPPED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() skip failing', () => {
    const err = new Error();
    const inst = new Test(() => {
        throw err;
    }, {skip: true});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.SKIPPED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() skip failing async', () => {
    const err = new Error();
    const inst = new Test(() => promised_timeout(10, err), {skip: true});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.SKIPPED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() sync', () => {
    const inst = new Test(noop, {sync: true});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() not timed out', () => {
    const inst = new Test(() => promised_timeout(10), {timeout: 100});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(inst.err, null);
    });
});

test('Test(...).run() timed out', () => {
    const inst = new Test(() => promised_timeout(100), {timeout: 10});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.FAILED);
        assert.ok(inst.err);
        assert.ok(inst.err.message);
        assert.ok((/Timeout/).test(inst.err.message));
    });
});

test('Test(...).run() no timeout', () => {
    const inst = new Test(() => promised_timeout(10), {timeout: 0});
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(inst.err, null);
    });
});
