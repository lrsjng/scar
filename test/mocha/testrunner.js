const assert = require('assert');
const {pto, TestRunner} = require('../loader');

describe('TestRunner', () => {
    it('TestRunner is function', () => {
        assert.strictEqual(typeof TestRunner, 'function');
    });

    it('TestRunner()', () => {
        const inst = TestRunner();
        assert.ok(inst);
        assert.ok(inst instanceof TestRunner);
        assert.strictEqual(Object.keys(inst).length, 9);
        assert.strictEqual(inst.desc, '[No Description]');
        assert.strictEqual(inst.fn, null);
        assert.strictEqual(inst.skip, false);
        assert.strictEqual(inst.sync, false);
        assert.strictEqual(inst.timeout, 1000);
        assert.strictEqual(inst.starttime, null);
        assert.strictEqual(inst.duration, null);
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.promise, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
    });

    it('TestRunner().run() passing sync fn', () => {
        const inst = TestRunner({
            fn: () => null
        });
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
        return inst.run().then(() => {
            assert.strictEqual(inst.err, null);
            assert.strictEqual(inst.passed(), true);
            assert.strictEqual(inst.failed(), false);
            assert.strictEqual(inst.skipped(), false);
            assert.strictEqual(inst.pending(), false);
        });
    });

    it('TestRunner().run() failing sync fn', () => {
        const err = new Error();
        const inst = TestRunner({
            fn: () => {throw err;}
        });
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
        return inst.run().then(() => {
            assert.strictEqual(inst.err, err);
            assert.strictEqual(inst.passed(), false);
            assert.strictEqual(inst.failed(), true);
            assert.strictEqual(inst.skipped(), false);
            assert.strictEqual(inst.pending(), false);
        });
    });

    it('TestRunner().run() passing async fn', () => {
        const inst = TestRunner({
            fn: () => pto(10)
        });
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
        return inst.run().then(() => {
            assert.strictEqual(inst.err, null);
            assert.strictEqual(inst.passed(), true);
            assert.strictEqual(inst.failed(), false);
            assert.strictEqual(inst.skipped(), false);
            assert.strictEqual(inst.pending(), false);
        });
    });

    it('TestRunner().run() failing async fn', () => {
        const err = new Error();
        const inst = TestRunner({
            fn: () => pto(10, err)
        });
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
        return inst.run().then(() => {
            assert.strictEqual(inst.err, err);
            assert.strictEqual(inst.passed(), false);
            assert.strictEqual(inst.failed(), true);
            assert.strictEqual(inst.skipped(), false);
            assert.strictEqual(inst.pending(), false);
        });
    });

    it('TestRunner().run() timed out', () => {
        const inst = TestRunner({
            fn: () => pto(100),
            timeout: 10
        });
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
        return inst.run().then(() => {
            assert.ok(/Test Timeout/.test(inst.err));
            assert.strictEqual(inst.passed(), false);
            assert.strictEqual(inst.failed(), true);
            assert.strictEqual(inst.skipped(), false);
            assert.strictEqual(inst.pending(), false);
        });
    });

    it('TestRunner().run() not timed out', () => {
        const inst = TestRunner({
            fn: () => pto(10),
            timeout: 100
        });
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
        return inst.run().then(() => {
            assert.strictEqual(inst.err, null);
            assert.strictEqual(inst.passed(), true);
            assert.strictEqual(inst.failed(), false);
            assert.strictEqual(inst.skipped(), false);
            assert.strictEqual(inst.pending(), false);
        });
    });

    it('TestRunner().run() no timeout', () => {
        const inst = TestRunner({
            fn: () => pto(10),
            timeout: null
        });
        assert.strictEqual(inst.err, null);
        assert.strictEqual(inst.passed(), false);
        assert.strictEqual(inst.failed(), false);
        assert.strictEqual(inst.skipped(), false);
        assert.strictEqual(inst.pending(), true);
        return inst.run().then(() => {
            assert.strictEqual(inst.err, null);
            assert.strictEqual(inst.passed(), true);
            assert.strictEqual(inst.failed(), false);
            assert.strictEqual(inst.skipped(), false);
            assert.strictEqual(inst.pending(), false);
        });
    });
});
