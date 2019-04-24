const {test, assert} = require('../../lib');
const {Err} = require('../loader');

test('Err is function', () => {
    assert.equal(typeof Err, 'function');
});

test('Err()', () => {
    const inst = new Err();
    assert.ok(inst);
    assert.ok(inst instanceof Err);
    assert.equal(inst.name, 'Err');
    assert.equal(inst.message, '[no message]');
    assert.equal(typeof inst.stack, 'string');
    assert.ok(inst.stack.length > 0);
    assert.equal(inst.drop, 0);
    assert.equal(inst.error, undefined);
    assert.ok(Array.isArray(inst.frames));
    assert.ok(inst.frames.length > 0);
    assert.ok(Array.isArray(inst.filteredFrames));
    assert.ok(inst.filteredFrames.length <= inst.frames.length);
});

test('Err(message)', () => {
    const message = 'some error message';
    const inst = new Err(message);
    assert.ok(inst);
    assert.ok(inst instanceof Err);
    assert.equal(inst.name, 'Err');
    assert.equal(inst.message, message);
    assert.equal(typeof inst.stack, 'string');
    assert.ok(inst.stack.length > 0);
    assert.equal(inst.drop, 0);
    assert.equal(inst.error, undefined);
    assert.ok(Array.isArray(inst.frames));
    assert.ok(inst.frames.length > 0);
    assert.ok(Array.isArray(inst.filteredFrames));
    assert.ok(inst.filteredFrames.length <= inst.frames.length);
});

test('Err(drop)', () => {
    const drop = 2;
    const inst = new Err(drop);
    assert.ok(inst);
    assert.ok(inst instanceof Err);
    assert.equal(inst.name, 'Err');
    assert.equal(inst.message, '[no message]');
    assert.equal(typeof inst.stack, 'string');
    assert.ok(inst.stack.length > 0);
    assert.equal(inst.drop, drop);
    assert.equal(inst.error, undefined);
    assert.ok(Array.isArray(inst.frames));
    assert.ok(inst.frames.length > 0);
    assert.ok(Array.isArray(inst.filteredFrames));
    assert.ok(inst.filteredFrames.length <= inst.frames.length);
});

test('Err({name, message, stack, drop})', () => {
    const name = 'some name';
    const message = 'some message';
    const stack = 'some stack';
    const drop = 123;
    const obj = {name, message, stack, drop};
    const inst = new Err(obj);
    assert.ok(inst);
    assert.ok(inst instanceof Err);
    assert.equal(inst.name, name);
    assert.equal(inst.message, message);
    assert.equal(inst.stack, stack);
    assert.equal(inst.drop, drop);
    assert.equal(inst.error, obj);
    assert.ok(Array.isArray(inst.frames));
    assert.equal(inst.frames.length, 0);
    assert.ok(Array.isArray(inst.filteredFrames));
    assert.equal(inst.filteredFrames.length, 0);
});

test('Err(Error)', () => {
    const obj = new Error();
    const inst = new Err(obj);
    assert.ok(inst);
    assert.ok(inst instanceof Err);
    assert.equal(inst.name, obj.name);
    assert.equal(inst.message, obj.message);
    assert.equal(inst.stack, obj.stack);
    assert.equal(inst.drop, 0);
    assert.equal(inst.error, obj);
    assert.ok(Array.isArray(inst.frames));
    assert.ok(inst.frames.length > 0);
    assert.ok(Array.isArray(inst.filteredFrames));
    assert.ok(inst.filteredFrames.length <= inst.frames.length);
});

test('Err({name, message, stack, drop})', () => {
    const name = 'some name';
    const message = 'some message';
    const stack = 'some stack';
    const drop = 123;
    const other = 'some other prop';
    const obj = {name, message, stack, drop, other};
    const inst = new Err(obj);
    assert.ok(inst);
    assert.ok(inst instanceof Err);
    assert.equal(inst.name, name);
    assert.equal(inst.message, message);
    assert.equal(inst.stack, stack);
    assert.equal(inst.drop, drop);
    assert.equal(inst.other, other);
    assert.equal(inst.error, obj);
    assert.ok(Array.isArray(inst.frames));
    assert.equal(inst.frames.length, 0);
    assert.ok(Array.isArray(inst.filteredFrames));
    assert.equal(inst.filteredFrames.length, 0);
});

test('Err().format is function', () => {
    const inst = new Err();
    assert.equal(typeof inst.format, 'function');
});

test('Err().format() returns String', () => {
    const inst = new Err();
    assert.equal(typeof inst.format(), 'string');
});

test('Err().format(prefix) returns String', () => {
    const inst = new Err();
    assert.equal(typeof inst.format(), 'string');
    assert.equal(inst.format(''), inst.format());
    assert.ok(inst.format(' ') !== inst.format());
});

test('Err().format(prefix, short) returns String', () => {
    const inst = new Err();
    assert.equal(typeof inst.format(), 'string');
    assert.equal(inst.format('', true), inst.format());
});

test('Err().toString() returns String', () => {
    const inst = new Err();
    assert.equal(typeof inst.toString(), 'string');
    assert.equal(inst.toString(), inst.format());
    assert.equal(inst.toString(), inst.format(''));
    assert.equal(inst.toString(), inst.format('', true));
});
