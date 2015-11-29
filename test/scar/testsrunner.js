const {test, assert} = require('../../lib');
const {Test, TestsRunner} = require('../loader');

test('TestsRunner is function', () => {
    assert.equal(typeof TestsRunner, 'function');
});

test('TestsRunner()', () => {
    const inst = TestsRunner();
    assert.ok(inst);
    assert.ok(inst instanceof TestsRunner);
    assert.equal(Object.keys(inst).length, 5);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.runners));
    assert.equal(inst.runners.length, 0);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('TestsRunner([], {})', () => {
    const inst = TestsRunner([], {});
    assert.ok(inst);
    assert.ok(inst instanceof TestsRunner);
    assert.equal(Object.keys(inst).length, 5);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.runners));
    assert.equal(inst.runners.length, 0);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('TestsRunner([], {sync})', () => {
    const inst = TestsRunner([], {sync: true});
    assert.ok(inst);
    assert.ok(inst instanceof TestsRunner);
    assert.equal(Object.keys(inst).length, 5);
    assert.equal(inst.sync, true);
    assert.ok(Array.isArray(inst.runners));
    assert.equal(inst.runners.length, 0);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('TestsRunner([], {...})', () => {
    const other = {};
    const inst = TestsRunner([], {other});
    assert.ok(inst);
    assert.ok(inst instanceof TestsRunner);
    assert.equal(Object.keys(inst).length, 6);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.runners));
    assert.equal(inst.runners.length, 0);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('TestsRunner().run()', () => {
    const inst = TestsRunner();
    assert.ok(inst);
    assert.ok(inst instanceof TestsRunner);
    assert.equal(Object.keys(inst).length, 5);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.runners));
    assert.equal(inst.runners.length, 0);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {

    });
});

test('TestsRunner([test]).run()', () => {
    const inst = TestsRunner([Test()]);
    assert.ok(inst);
    assert.ok(inst instanceof TestsRunner);
    assert.equal(Object.keys(inst).length, 5);
    assert.equal(inst.sync, false);
    assert.ok(Array.isArray(inst.runners));
    assert.equal(inst.runners.length, 1);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {

    });
});

test('TestsRunner([test], {sync}).run()', () => {
    const inst = TestsRunner([Test()], {sync: true});
    assert.ok(inst);
    assert.ok(inst instanceof TestsRunner);
    assert.equal(Object.keys(inst).length, 5);
    assert.equal(inst.sync, true);
    assert.ok(Array.isArray(inst.runners));
    assert.equal(inst.runners.length, 1);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {

    });
});
