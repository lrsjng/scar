const assert = require('assert');
const {lib, rejects} = require('../loader');

const noop = () => {};

describe('test', () => {
    it('test is function', () => {
        assert.strictEqual(typeof lib.test, 'function');
    });

    it('test has the right props', () => {
        const act = Object.keys(lib.test).sort();
        const exp = ['scar', 'skip', 'sync', 'run'].sort();
        assert.strictEqual(act.length, exp.length);
        act.forEach((_, idx) => assert.strictEqual(act[idx], exp[idx]));
    });

    it('test()', () => {
        lib.test();
    });

    it('test.run() no tests', () => {
        const test = lib.Scar().static();
        test.scar.reporter = noop;
        return test.run();
    });

    it('test.run() passing', () => {
        const test = lib.Scar().static();
        test.scar.reporter = noop;
        test('passing', noop);
        return test.run();
    });

    it('test.run() failing', () => {
        const test = lib.Scar().static();
        test.scar.reporter = noop;
        test('failing', () => {
            throw new Error();
        });
        return test.run();
    });

    it('test.run() skipping', () => {
        const test = lib.Scar().static();
        test.scar.reporter = noop;
        test.skip('skipping', noop);
        return test.run();
    });

    it('test.run() sync', () => {
        const test = lib.Scar().static();
        test.scar.reporter = noop;
        test.sync('sync', noop);
        return test.run();
    });

    it('test.run() all', () => {
        const test = lib.Scar().static();
        test.scar.reporter = noop;
        test('passing', noop);
        test.skip('skipping', noop);
        test.sync('sync', noop);
        test('failing', () => {
            throw new Error();
        });
        return test.run();
    });

    it('test.run() no reporter', () => {
        const test = lib.Scar().static();
        test.scar.reporter = null;
        test('passing', noop);
        return test.run();
    });

    it('test.run() error in reporter throws', () => {
        const test = lib.Scar().static();
        test.scar.reporter = () => {
            throw new Error('some error object');
        };
        test('passing', noop);
        return rejects(test.run(), /some error object/);
    });
});
