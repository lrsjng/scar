const assert = require('assert');
const {Err} = require('../loader');

describe('Err', () => {
    it('Err is function', () => {
        assert.strictEqual(typeof Err, 'function');
    });

    it('Err()', () => {
        const inst = Err();
        assert.ok(inst);
        assert.ok(inst instanceof Err);
        assert.strictEqual(Object.keys(inst).length, 6);
        assert.strictEqual(inst.name, 'Err');
        assert.strictEqual(inst.message, '[no message]');
        assert.strictEqual(typeof inst.stack, 'string');
        assert.ok(inst.stack.length > 0);
        assert.strictEqual(inst.drop, 0);
        assert.strictEqual(inst.error, undefined);
        assert.ok(Array.isArray(inst.frames));
        assert.ok(inst.frames.length > 0);
        assert.ok(Array.isArray(inst.filteredFrames));
        assert.ok(inst.filteredFrames.length <= inst.frames.length);
    });

    it('Err(message)', () => {
        const message = 'some error message';
        const inst = Err(message);
        assert.ok(inst);
        assert.ok(inst instanceof Err);
        assert.strictEqual(Object.keys(inst).length, 6);
        assert.strictEqual(inst.name, 'Err');
        assert.strictEqual(inst.message, message);
        assert.strictEqual(typeof inst.stack, 'string');
        assert.ok(inst.stack.length > 0);
        assert.strictEqual(inst.drop, 0);
        assert.strictEqual(inst.error, undefined);
        assert.ok(Array.isArray(inst.frames));
        assert.ok(inst.frames.length > 0);
        assert.ok(Array.isArray(inst.filteredFrames));
        assert.ok(inst.filteredFrames.length <= inst.frames.length);
    });

    it('Err(drop)', () => {
        const drop = 2;
        const inst = Err(drop);
        assert.ok(inst);
        assert.ok(inst instanceof Err);
        assert.strictEqual(Object.keys(inst).length, 6);
        assert.strictEqual(inst.name, 'Err');
        assert.strictEqual(inst.message, '[no message]');
        assert.strictEqual(typeof inst.stack, 'string');
        assert.ok(inst.stack.length > 0);
        assert.strictEqual(inst.drop, drop);
        assert.strictEqual(inst.error, undefined);
        assert.ok(Array.isArray(inst.frames));
        assert.ok(inst.frames.length > 0);
        assert.ok(Array.isArray(inst.filteredFrames));
        assert.ok(inst.filteredFrames.length <= inst.frames.length);
    });

    it('Err({name, message, stack, drop})', () => {
        const name = 'some name';
        const message = 'some message';
        const stack = 'some stack';
        const drop = 123;
        const obj = {name, message, stack, drop};
        const inst = Err(obj);
        assert.ok(inst);
        assert.ok(inst instanceof Err);
        assert.strictEqual(Object.keys(inst).length, 7);
        assert.strictEqual(inst.name, name);
        assert.strictEqual(inst.message, message);
        assert.strictEqual(inst.stack, stack);
        assert.strictEqual(inst.drop, drop);
        assert.strictEqual(inst.error, obj);
        assert.ok(Array.isArray(inst.frames));
        assert.strictEqual(inst.frames.length, 0);
        assert.ok(Array.isArray(inst.filteredFrames));
        assert.strictEqual(inst.filteredFrames.length, 0);
    });

    it('Err(Error)', () => {
        const obj = new Error();
        const inst = Err(obj);
        assert.ok(inst);
        assert.ok(inst instanceof Err);
        assert.strictEqual(Object.keys(inst).length, 7);
        assert.strictEqual(inst.name, obj.name);
        assert.strictEqual(inst.message, obj.message);
        assert.strictEqual(inst.stack, obj.stack);
        assert.strictEqual(inst.drop, 0);
        assert.strictEqual(inst.error, obj);
        assert.ok(Array.isArray(inst.frames));
        assert.ok(inst.frames.length > 0);
        assert.ok(Array.isArray(inst.filteredFrames));
        assert.ok(inst.filteredFrames.length <= inst.frames.length);
    });

    it('Err({name, message, stack, drop})', () => {
        const name = 'some name';
        const message = 'some message';
        const stack = 'some stack';
        const drop = 123;
        const other = 'some other prop';
        const obj = {name, message, stack, drop, other};
        const inst = Err(obj);
        assert.ok(inst);
        assert.ok(inst instanceof Err);
        assert.strictEqual(Object.keys(inst).length, 8);
        assert.strictEqual(inst.name, name);
        assert.strictEqual(inst.message, message);
        assert.strictEqual(inst.stack, stack);
        assert.strictEqual(inst.drop, drop);
        assert.strictEqual(inst.other, other);
        assert.strictEqual(inst.error, obj);
        assert.ok(Array.isArray(inst.frames));
        assert.strictEqual(inst.frames.length, 0);
        assert.ok(Array.isArray(inst.filteredFrames));
        assert.strictEqual(inst.filteredFrames.length, 0);
    });

    it('Err().format is function', () => {
        const inst = Err();
        assert.strictEqual(typeof inst.format, 'function');
    });

    it('Err().format() returns String', () => {
        const inst = Err();
        assert.strictEqual(typeof inst.format(), 'string');
    });

    it('Err().format(prefix) returns String', () => {
        const inst = Err();
        assert.strictEqual(typeof inst.format(), 'string');
        assert.strictEqual(inst.format(''), inst.format());
        assert.ok(inst.format(' ') !== inst.format());
    });

    it('Err().format(prefix, short) returns String', () => {
        const inst = Err();
        assert.strictEqual(typeof inst.format(), 'string');
        assert.strictEqual(inst.format('', true), inst.format());
    });

    it('Err().toString() returns String', () => {
        const inst = Err();
        assert.strictEqual(typeof inst.toString(), 'string');
        assert.strictEqual(inst.toString(), inst.format());
        assert.strictEqual(inst.toString(), inst.format(''));
        assert.strictEqual(inst.toString(), inst.format('', true));
    });
});
