const {test, assert} = require('../../lib');
const {lib} = require('../loader');
const spy = lib.spy;

test('spy is function', () => {
    assert.equal(typeof spy, 'function');
});

test('spy() returns a function', () => {
    assert.equal(typeof spy(), 'function');
});

test('spy() has prop calls[] of length 0', () => {
    assert.ok(Array.isArray(spy().calls));
    assert.equal(spy().calls.length, 0);
});

test('spy()() adds call to calls[]', () => {
    const inst = spy();
    inst();
    assert.equal(inst.calls.length, 1);
    inst();
    assert.equal(inst.calls.length, 2);
});

test('spy()() adds correct props to call', () => {
    const inst = spy();
    const date0 = Date.now();
    inst();
    const date1 = Date.now();
    assert.equal(inst.calls.length, 1);
    assert.equal(inst.calls[0].idx, 0);
    assert.deepEqual(inst.calls[0].args, []);
    assert.equal(inst.calls[0].ret, undefined);
    assert.ok(inst.calls[0].time >= date0);
    assert.ok(inst.calls[0].done <= date1);
});

test('spy()(11, 22, 33) adds correct props to call', () => {
    const inst = spy();
    const date0 = Date.now();
    inst(11, 22, 33);
    const date1 = Date.now();
    assert.equal(inst.calls.length, 1);
    assert.equal(inst.calls[0].idx, 0);
    assert.deepEqual(inst.calls[0].args, [11, 22, 33]);
    assert.equal(inst.calls[0].ret, undefined);
    assert.ok(inst.calls[0].time >= date0);
    assert.ok(inst.calls[0].done <= date1);
});

test('spy(() => 99)(11, 22, 33) adds correct props to call', () => {
    const inst = spy(() => 99);
    const date0 = Date.now();
    inst(11, 22, 33);
    const date1 = Date.now();
    assert.equal(inst.calls.length, 1);
    assert.equal(inst.calls[0].idx, 0);
    assert.deepEqual(inst.calls[0].args, [11, 22, 33]);
    assert.equal(inst.calls[0].ret, 99);
    assert.ok(inst.calls[0].time >= date0);
    assert.ok(inst.calls[0].done <= date1);
});
