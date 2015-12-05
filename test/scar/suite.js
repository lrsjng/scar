const {test, assert} = require('../../lib');
const {rejects, Test, Suite} = require('../loader');

test('Suite is function', () => {
    assert.equal(typeof Suite, 'function');
});

test('Suite()', () => {
    const inst = Suite();
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 8);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Suite([], {})', () => {
    const inst = Suite([], {});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 8);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Suite([], {sync})', () => {
    const inst = Suite([], {sync: true});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 8);
    assert.equal(inst.sync, true);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Suite([], {...})', () => {
    const other = {};
    const inst = Suite([], {other});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Suite().run()', () => {
    const inst = Suite();
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 8);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 0);
        assert.equal(inst.runCount, 0);
        assert.equal(inst.settledCount, 0);
        assert.equal(inst.passedCount, 0);
        assert.equal(inst.failedCount, 0);
        assert.equal(inst.skippedCount, 0);
    });
});

test('Suite([test]).run()', () => {
    const inst = Suite([Test()]);
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 8);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 1);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 1);
        assert.equal(inst.runCount, 1);
        assert.equal(inst.settledCount, 1);
        assert.equal(inst.passedCount, 1);
        assert.equal(inst.failedCount, 0);
        assert.equal(inst.skippedCount, 0);
    });
});

test('Suite([...]).run()', () => {
    const inst = Suite([
        Test(),
        Test(() => {
            throw new Error();
        }),
        Test({skip: true})
    ]);
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 8);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 3);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.FAILED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 3);
        assert.equal(inst.runCount, 3);
        assert.equal(inst.settledCount, 3);
        assert.equal(inst.passedCount, 1);
        assert.equal(inst.failedCount, 1);
        assert.equal(inst.skippedCount, 1);
    });
});

test('Suite([...]).run() rejects if error in reporter', () => {
    const inst = Suite([Test()]);
    inst.reporter = () => {
        throw new Error('some error object');
    };
    return rejects(inst.run(), /some error object/);
});

test('Suite([test], {sync}).run()', () => {
    const inst = Suite([Test()], {sync: true});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 8);
    assert.equal(inst.sync, true);
    assert.ok(Array.isArray(inst.filters));
    assert.equal(inst.filters.length, 0);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 1);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 1);
        assert.equal(inst.runCount, 1);
        assert.equal(inst.settledCount, 1);
        assert.equal(inst.passedCount, 1);
        assert.equal(inst.failedCount, 0);
        assert.equal(inst.skippedCount, 0);
    });
});
