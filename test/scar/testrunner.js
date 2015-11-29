const {test, assert} = require('../../lib');
const {pto, TestRunner} = require('../loader');

test('TestRunner is function', () => {
    assert.equal(typeof TestRunner, 'function');
});

test('TestRunner()', () => {
    const inst = TestRunner();
    assert.ok(inst);
    assert.ok(inst instanceof TestRunner);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.desc, '[No Description]');
    assert.equal(inst.fn, null);
    assert.equal(inst.skip, false);
    assert.equal(inst.sync, false);
    assert.equal(inst.timeout, 1000);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.err, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
});

test('Testrunner().run() passing sync fn', () => {
    const inst = TestRunner({
        fn: () => null
    });
    assert.equal(inst.err, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
    return inst.run().then(() => {
        assert.equal(inst.err, null);
        assert.equal(inst.passed(), true);
        assert.equal(inst.failed(), false);
        assert.equal(inst.skipped(), false);
        assert.equal(inst.pending(), false);
    });
});

test('Testrunner().run() failing sync fn', () => {
    const err = new Error();
    const inst = TestRunner({
        fn: () => {throw err;}
    });
    assert.equal(inst.err, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
    return inst.run().then(() => {
        assert.equal(inst.err, err);
        assert.equal(inst.passed(), false);
        assert.equal(inst.failed(), true);
        assert.equal(inst.skipped(), false);
        assert.equal(inst.pending(), false);
    });
});

test('Testrunner().run() passing async fn', () => {
    const inst = TestRunner({
        fn: () => pto(10)
    });
    assert.equal(inst.err, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
    return inst.run().then(() => {
        assert.equal(inst.err, null);
        assert.equal(inst.passed(), true);
        assert.equal(inst.failed(), false);
        assert.equal(inst.skipped(), false);
        assert.equal(inst.pending(), false);
    });
});

test('Testrunner().run() failing async fn', () => {
    const err = new Error();
    const inst = TestRunner({
        fn: () => pto(10, err)
    });
    assert.equal(inst.err, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
    return inst.run().then(() => {
        assert.equal(inst.err, err);
        assert.equal(inst.passed(), false);
        assert.equal(inst.failed(), true);
        assert.equal(inst.skipped(), false);
        assert.equal(inst.pending(), false);
    });
});

test('Testrunner().run() timed out', () => {
    const inst = TestRunner({
        fn: () => pto(100),
        timeout: 10
    });
    assert.equal(inst.err, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
    return inst.run().then(() => {
        assert.ok(/Test Timeout/.test(inst.err));
        assert.equal(inst.passed(), false);
        assert.equal(inst.failed(), true);
        assert.equal(inst.skipped(), false);
        assert.equal(inst.pending(), false);
    });
});

test('Testrunner().run() not timed out', () => {
    const inst = TestRunner({
        fn: () => pto(10),
        timeout: 100
    });
    assert.equal(inst.err, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
    return inst.run().then(() => {
        assert.equal(inst.err, null);
        assert.equal(inst.passed(), true);
        assert.equal(inst.failed(), false);
        assert.equal(inst.skipped(), false);
        assert.equal(inst.pending(), false);
    });
});

test('Testrunner().run() no timeout', () => {
    const inst = TestRunner({
        fn: () => pto(10),
        timeout: null
    });
    assert.equal(inst.err, null);
    assert.equal(inst.passed(), false);
    assert.equal(inst.failed(), false);
    assert.equal(inst.skipped(), false);
    assert.equal(inst.pending(), true);
    return inst.run().then(() => {
        assert.equal(inst.err, null);
        assert.equal(inst.passed(), true);
        assert.equal(inst.failed(), false);
        assert.equal(inst.skipped(), false);
        assert.equal(inst.pending(), false);
    });
});
