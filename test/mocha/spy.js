const assert = require('assert');
const {lib} = require('../loader');
const spy = lib.spy;

describe('spy', () => {
    it('is function', () => {
        assert.strictEqual(typeof spy, 'function');
    });

    it('spy() returns a function', () => {
        assert.strictEqual(typeof spy(), 'function');
    });

    it('spy() has prop calls[] of length 0', () => {
        assert.ok(Array.isArray(spy().calls));
        assert.strictEqual(spy().calls.length, 0);
    });

    it('spy()() adds call to calls[]', () => {
        const inst = spy();
        inst();
        assert.strictEqual(inst.calls.length, 1);
        inst();
        assert.strictEqual(inst.calls.length, 2);
    });

    it('spy()() adds correct props to call', () => {
        const inst = spy();
        const date0 = Date.now();
        inst();
        const date1 = Date.now();
        assert.strictEqual(inst.calls.length, 1);
        assert.strictEqual(inst.calls[0].idx, 0);
        assert.deepEqual(inst.calls[0].args, []);
        assert.strictEqual(inst.calls[0].ret, undefined);
        assert.ok(inst.calls[0].time >= date0);
        assert.ok(inst.calls[0].done <= date1);
    });

    it('spy()(11, 22, 33) adds correct props to call', () => {
        const inst = spy();
        const date0 = Date.now();
        inst(11, 22, 33);
        const date1 = Date.now();
        assert.strictEqual(inst.calls.length, 1);
        assert.strictEqual(inst.calls[0].idx, 0);
        assert.deepEqual(inst.calls[0].args, [11, 22, 33]);
        assert.strictEqual(inst.calls[0].ret, undefined);
        assert.ok(inst.calls[0].time >= date0);
        assert.ok(inst.calls[0].done <= date1);
    });

    it('spy(() => 99)(11, 22, 33) adds correct props to call', () => {
        const inst = spy(() => 99);
        const date0 = Date.now();
        inst(11, 22, 33);
        const date1 = Date.now();
        assert.strictEqual(inst.calls.length, 1);
        assert.strictEqual(inst.calls[0].idx, 0);
        assert.deepEqual(inst.calls[0].args, [11, 22, 33]);
        assert.strictEqual(inst.calls[0].ret, 99);
        assert.ok(inst.calls[0].time >= date0);
        assert.ok(inst.calls[0].done <= date1);
    });
});
