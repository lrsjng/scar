const {test, assert} = require('../../lib');
const {Test, Suite} = require('../loader');

test('Suite is function', () => {
    assert.equal(typeof Suite, 'function');
});

test('Suite()', () => {
    const inst = new Suite();
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, false);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Suite({})', () => {
    const inst = new Suite({});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, false);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Suite({sync})', () => {
    const inst = new Suite({sync: true});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, true);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
});

test('Suite({...})', () => {
    const other = {};
    const inst = new Suite({other});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 10);
    assert.equal(inst.sync, false);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    assert.equal(inst.other, other);
});

test('Suite().run()', () => {
    const inst = new Suite();
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, false);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 0);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 0);
        assert.equal(inst.run_count, 0);
        assert.equal(inst.settled_count, 0);
        assert.equal(inst.passed_count, 0);
        assert.equal(inst.failed_count, 0);
        assert.equal(inst.skipped_count, 0);
    });
});

test('Suite({tests: [test]}).run()', () => {
    const inst = new Suite({tests: [new Test()]});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, false);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 1);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 1);
        assert.equal(inst.run_count, 1);
        assert.equal(inst.settled_count, 1);
        assert.equal(inst.passed_count, 1);
        assert.equal(inst.failed_count, 0);
        assert.equal(inst.skipped_count, 0);
    });
});

test('Suite({tests: [...]}).run()', () => {
    const inst = new Suite({tests: [
        new Test(),
        new Test(() => {
            throw new Error();
        }),
        new Test({skip: true})
    ]});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, false);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 3);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.FAILED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 3);
        assert.equal(inst.run_count, 3);
        assert.equal(inst.settled_count, 3);
        assert.equal(inst.passed_count, 1);
        assert.equal(inst.failed_count, 1);
        assert.equal(inst.skipped_count, 1);
    });
});

test('Suite({tests: [...]}).run() rejects if error in reporter', () => {
    const inst = new Suite({tests: [new Test()]});
    inst.reporter = () => {
        throw new Error('some error object');
    };
    return assert.rejects(inst.run(), /some error object/);
});

test('Suite({tests: [test], sync}).run()', () => {
    const inst = new Suite({tests: [new Test()], sync: true});
    assert.ok(inst);
    assert.ok(inst instanceof Suite);
    assert.equal(Object.keys(inst).length, 9);
    assert.equal(inst.sync, true);
    assert.equal(inst.filter, null);
    assert.equal(inst.max_conc, 64);
    assert.ok(Array.isArray(inst.tests));
    assert.equal(inst.tests.length, 1);
    assert.equal(inst.reporter, null);
    assert.equal(inst.status, Test.WAITING);
    assert.equal(inst.starttime, null);
    assert.equal(inst.duration, null);
    assert.equal(inst.promise, null);
    return inst.run().then(() => {
        assert.equal(inst.status, Test.PASSED);
        assert.equal(typeof inst.starttime, 'number');
        assert.equal(typeof inst.duration, 'number');
        assert.ok(inst.duration >= 0);
        assert.ok(inst.promise instanceof Promise);
        assert.equal(inst.total, 1);
        assert.equal(inst.run_count, 1);
        assert.equal(inst.settled_count, 1);
        assert.equal(inst.passed_count, 1);
        assert.equal(inst.failed_count, 0);
        assert.equal(inst.skipped_count, 0);
    });
});
