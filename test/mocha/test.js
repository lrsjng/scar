const assert = require('assert');
const {Test} = require('../loader');

describe('Test', () => {
    it('Test is function', () => {
        assert.strictEqual(typeof Test, 'function');
    });

    it('Test()', () => {
        const inst = Test();
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 0);
    });

    it('Test(desc)', () => {
        const desc = 'some desc';
        const inst = Test(desc);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 1);
        assert.strictEqual(inst.desc, desc);
    });

    it('Test(fn)', () => {
        const fn = () => null;
        const inst = Test(fn);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 1);
        assert.strictEqual(inst.fn, fn);
    });

    it('Test(desc, fn)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const inst = Test(desc, fn);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 2);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
    });

    it('Test(fn, desc)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const inst = Test(fn, desc);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 2);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
    });

    it('Test({})', () => {
        const inst = Test({});
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 0);
    });

    it('Test({desc})', () => {
        const desc = 'some desc';
        const obj = {desc};
        const inst = Test(obj);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 1);
        assert.strictEqual(inst.desc, desc);
    });

    it('Test({fn})', () => {
        const fn = () => null;
        const obj = {fn};
        const inst = Test(obj);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 1);
        assert.strictEqual(inst.fn, fn);
    });

    it('Test({desc, fn})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const obj = {desc, fn};
        const inst = Test(obj);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 2);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
    });

    it('Test({desc, fn, ...})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {desc, fn, other};
        const inst = Test(obj);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });

    it('Test(desc, fn, {...})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(desc, fn, obj);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });

    it('Test(desc, fn, {...}, ...)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(desc, fn, obj, true);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });

    it('Test(fn, desc, {...})', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(fn, desc, obj);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });

    it('Test(desc, {...}, fn)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(desc, obj, fn);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });

    it('Test(fn, {...}, desc)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(fn, obj, desc);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });

    it('Test({...}, desc, fn)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(obj, desc, fn);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });

    it('Test({...}, fn, desc)', () => {
        const desc = 'some desc';
        const fn = () => null;
        const other = {};
        const obj = {other};
        const inst = Test(obj, fn, desc);
        assert.ok(inst);
        assert.strictEqual(Object.keys(inst).length, 3);
        assert.strictEqual(inst.desc, desc);
        assert.strictEqual(inst.fn, fn);
        assert.strictEqual(inst.other, other);
    });
});
