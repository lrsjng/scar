const {test, assert} = require('../../lib');
const {Test} = require('../loader');

test('Test is function', () => {
    assert.equal(typeof Test, 'function');
});

test('Test()', () => {
    const inst = Test();
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 0);
});

test('Test(desc)', () => {
    const desc = 'some desc';
    const inst = Test(desc);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 1);
    assert.equal(inst.desc, desc);
});

test('Test(fn)', () => {
    const fn = () => null;
    const inst = Test(fn);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 1);
    assert.equal(inst.fn, fn);
});

test('Test(desc, fn)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const inst = Test(desc, fn);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 2);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
});

test('Test(fn, desc)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const inst = Test(fn, desc);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 2);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
});

test('Test({})', () => {
    const inst = Test({});
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 0);
});

test('Test({desc})', () => {
    const desc = 'some desc';
    const obj = {desc};
    const inst = Test(obj);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 1);
    assert.equal(inst.desc, desc);
});

test('Test({fn})', () => {
    const fn = () => null;
    const obj = {fn};
    const inst = Test(obj);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 1);
    assert.equal(inst.fn, fn);
});

test('Test({desc, fn})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const obj = {desc, fn};
    const inst = Test(obj);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 2);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
});

test('Test({desc, fn, ...})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {desc, fn, other};
    const inst = Test(obj);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});

test('Test(desc, fn, {...})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = Test(desc, fn, obj);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});

test('Test(desc, fn, {...}, ...)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = Test(desc, fn, obj, true);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});

test('Test(fn, desc, {...})', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = Test(fn, desc, obj);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});

test('Test(desc, {...}, fn)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = Test(desc, obj, fn);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});

test('Test(fn, {...}, desc)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = Test(fn, obj, desc);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});

test('Test({...}, desc, fn)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = Test(obj, desc, fn);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});

test('Test({...}, fn, desc)', () => {
    const desc = 'some desc';
    const fn = () => null;
    const other = {};
    const obj = {other};
    const inst = Test(obj, fn, desc);
    assert.ok(inst);
    assert.equal(Object.keys(inst).length, 3);
    assert.equal(inst.desc, desc);
    assert.equal(inst.fn, fn);
    assert.equal(inst.other, other);
});
