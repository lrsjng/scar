const assert = require('assert');
const {rejects, Test, Suite} = require('../loader');

describe('Suite', () => {
    it('Suite is function', () => {
        assert.strictEqual(typeof Suite, 'function');
    });

    it('Suite()', () => {
        const inst = Suite();
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 0);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Suite([], {})', () => {
        const inst = Suite([], {});
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 0);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Suite([], {sync})', () => {
        const inst = Suite([], {sync: true});
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.sync, true);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 0);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('Suite([], {...})', () => {
        const other = {};
        const inst = Suite([], {other});
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 10);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 0);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('Suite().run()', () => {
        const inst = Suite();
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 0);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(typeof inst.starttime, 'number');
            assert.strictEqual(typeof inst.duration, 'number');
            assert.ok(inst.duration >= 0);
            assert.ok(inst.promise instanceof Promise);
            assert.strictEqual(inst.total, 0);
            assert.strictEqual(inst.runCount, 0);
            assert.strictEqual(inst.settledCount, 0);
            assert.strictEqual(inst.passedCount, 0);
            assert.strictEqual(inst.failedCount, 0);
            assert.strictEqual(inst.skippedCount, 0);
        });
    });

    it('Suite([test]).run()', () => {
        const inst = Suite([Test()]);
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 1);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(typeof inst.starttime, 'number');
            assert.strictEqual(typeof inst.duration, 'number');
            assert.ok(inst.duration >= 0);
            assert.ok(inst.promise instanceof Promise);
            assert.strictEqual(inst.total, 1);
            assert.strictEqual(inst.runCount, 1);
            assert.strictEqual(inst.settledCount, 1);
            assert.strictEqual(inst.passedCount, 1);
            assert.strictEqual(inst.failedCount, 0);
            assert.strictEqual(inst.skippedCount, 0);
        });
    });

    it('Suite([...]).run()', () => {
        const inst = Suite([
            Test(),
            Test(() => {
                throw new Error();
            }),
            Test({skip: true})
        ]);
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 3);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.FAILED);
            assert.strictEqual(typeof inst.starttime, 'number');
            assert.strictEqual(typeof inst.duration, 'number');
            assert.ok(inst.duration >= 0);
            assert.ok(inst.promise instanceof Promise);
            assert.strictEqual(inst.total, 3);
            assert.strictEqual(inst.runCount, 3);
            assert.strictEqual(inst.settledCount, 3);
            assert.strictEqual(inst.passedCount, 1);
            assert.strictEqual(inst.failedCount, 1);
            assert.strictEqual(inst.skippedCount, 1);
        });
    });

    it('Suite([...]).run() rejects if error in reporter', () => {
        const inst = Suite([Test()]);
        inst.reporter = () => {
            throw new Error('some error object');
        };
        return rejects(inst.run(), /some error object/);
    });

    it('Suite([test], {sync}).run()', () => {
        const inst = Suite([Test()], {sync: true});
        assert.ok(inst);
        // assert.ok(inst instanceof Suite);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.sync, true);
        assert.strictEqual(inst.filter, null);
        assert.strictEqual(inst.maxConcurrent, 100);
        assert.ok(Array.isArray(inst.tests));
        assert.strictEqual(inst.tests.length, 1);
        assert.strictEqual(inst.reporter, null);
        assert.strictEqual(inst.status, Test.WAITING);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        return inst.run().then(() => {
            assert.strictEqual(inst.status, Test.PASSED);
            assert.strictEqual(typeof inst.starttime, 'number');
            assert.strictEqual(typeof inst.duration, 'number');
            assert.ok(inst.duration >= 0);
            assert.ok(inst.promise instanceof Promise);
            assert.strictEqual(inst.total, 1);
            assert.strictEqual(inst.runCount, 1);
            assert.strictEqual(inst.settledCount, 1);
            assert.strictEqual(inst.passedCount, 1);
            assert.strictEqual(inst.failedCount, 0);
            assert.strictEqual(inst.skippedCount, 0);
        });
    });
});
