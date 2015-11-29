const assert = require('assert');
const {Test, TestsRunner} = require('../loader');

describe('TestsRunner', () => {
    it('TestsRunner is function', () => {
        assert.strictEqual(typeof TestsRunner, 'function');
    });

    it('TestsRunner()', () => {
        const inst = TestsRunner();
        assert.ok(inst);
        assert.ok(inst instanceof TestsRunner);
        assert.strictEqual(Object.keys(inst).length, 5);
        assert.strictEqual(inst.sync, false);
        assert.ok(Array.isArray(inst.runners));
        assert.strictEqual(inst.runners.length, 0);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('TestsRunner([], {})', () => {
        const inst = TestsRunner([], {});
        assert.ok(inst);
        assert.ok(inst instanceof TestsRunner);
        assert.strictEqual(Object.keys(inst).length, 5);
        assert.strictEqual(inst.sync, false);
        assert.ok(Array.isArray(inst.runners));
        assert.strictEqual(inst.runners.length, 0);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('TestsRunner([], {sync})', () => {
        const inst = TestsRunner([], {sync: true});
        assert.ok(inst);
        assert.ok(inst instanceof TestsRunner);
        assert.strictEqual(Object.keys(inst).length, 5);
        assert.strictEqual(inst.sync, true);
        assert.ok(Array.isArray(inst.runners));
        assert.strictEqual(inst.runners.length, 0);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
    });

    it('TestsRunner([], {...})', () => {
        const other = {};
        const inst = TestsRunner([], {other});
        assert.ok(inst);
        assert.ok(inst instanceof TestsRunner);
        assert.strictEqual(Object.keys(inst).length, 6);
        assert.strictEqual(inst.sync, false);
        assert.ok(Array.isArray(inst.runners));
        assert.strictEqual(inst.runners.length, 0);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.other, other);
    });

    it('TestsRunner().run()', () => {
        const inst = TestsRunner();
        assert.ok(inst);
        assert.ok(inst instanceof TestsRunner);
        assert.strictEqual(Object.keys(inst).length, 5);
        assert.strictEqual(inst.sync, false);
        assert.ok(Array.isArray(inst.runners));
        assert.strictEqual(inst.runners.length, 0);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        return inst.run().then(() => {

        });
    });

    it('TestsRunner([test]).run()', () => {
        const inst = TestsRunner([Test()]);
        assert.ok(inst);
        assert.ok(inst instanceof TestsRunner);
        assert.strictEqual(Object.keys(inst).length, 5);
        assert.strictEqual(inst.sync, false);
        assert.ok(Array.isArray(inst.runners));
        assert.strictEqual(inst.runners.length, 1);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        return inst.run().then(() => {

        });
    });

    it('TestsRunner([test], {sync}).run()', () => {
        const inst = TestsRunner([Test()], {sync: true});
        assert.ok(inst);
        assert.ok(inst instanceof TestsRunner);
        assert.strictEqual(Object.keys(inst).length, 5);
        assert.strictEqual(inst.sync, true);
        assert.ok(Array.isArray(inst.runners));
        assert.strictEqual(inst.runners.length, 1);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.promise, null);
        return inst.run().then(() => {

        });
    });
});
