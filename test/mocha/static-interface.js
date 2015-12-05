const assert = require('assert');
const {lib, rejects} = require('../loader');

const noop = () => {};

describe('test', () => {
    it('test is function', () => {
        assert.strictEqual(typeof lib.test, 'function');
    });

    it('test has the right props', () => {
        const act = Object.keys(lib.test).sort();
        const exp = ['scar', 'skip', 'sync', 'run', 'cli'].sort();
        assert.strictEqual(act.length, exp.length);
        act.forEach((_, idx) => assert.strictEqual(act[idx], exp[idx]));
    });

    it('test()', () => {
        lib.test();
    });

    it('test.run() no tests', () => {
        const test = lib.Scar().static();
        return test.run({reporter: noop});
    });

    it('test.run() passing', () => {
        const test = lib.Scar().static();
        test('passing', noop);
        return test.run({reporter: noop});
    });

    it('test.run() failing', () => {
        const test = lib.Scar().static();
        test('failing', () => {
            throw new Error();
        });
        return test.run({reporter: noop});
    });

    it('test.run() skipping', () => {
        const test = lib.Scar().static();
        test.skip('skipping', noop);
        return test.run({reporter: noop});
    });

    it('test.run() sync', () => {
        const test = lib.Scar().static();
        test.sync('sync', noop);
        return test.run({reporter: noop});
    });

    it('test.run() all', () => {
        const test = lib.Scar().static();
        test('passing', noop);
        test.skip('skipping', noop);
        test.sync('sync', noop);
        test('failing', () => {
            throw new Error();
        });
        return test.run({reporter: noop});
    });

    it('test.run() no reporter', () => {
        const test = lib.Scar().static();
        test('passing', noop);
        return test.run({reporter: null});
    });

    it('test.run() error in reporter throws', () => {
        const test = lib.Scar().static();
        const reporter = () => {
            throw new Error('some error object');
        };
        test('passing', noop);
        return rejects(test.run({reporter}), /some error object/);
    });
});
