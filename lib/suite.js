const {asFn} = require('./util');
const Test = require('./test');

const runParallel = fns => {
    return Promise.all(fns.map(fn => fn()));
};

const runSequential = fns => {
    let promise = Promise.resolve();
    fns.forEach(fn => promise = promise.then(fn));
    return promise;
};

const isSync = test => !!test.sync;
const isAsync = test => !test.sync;

const Suite = module.exports = (tests = [], options) => {
    return Object.assign(Object.create(Suite.prototype), {
        sync: false,
        reporter: null
    }, options, {
        tests: tests.map(Test),
        status: Test.WAITING,
        starttime: null,
        duration: null,
        promise: null
    });
};

Suite.prototype = {
    constructor: Suite,

    runTest(test) {
        return Promise.resolve()
            .then(() => asFn(this.reporter)('beforeTest', this, test))
            .then(() => {
                this.runCount += 1;
                test.runIdx = this.runCount;
            })
            .then(() => test.run())
            .then(() => {
                this.settledCount += 1;
                test.settledIdx = this.settledCount;
                if (test.status === Test.PASSED) {
                    this.passedCount += 1;
                    test.passedIdx = this.passedCount;
                } else if (test.status === Test.SKIPPED) {
                    this.skippedCount += 1;
                    test.skippedIdx = this.skippedCount;
                } else {
                    this.failedCount += 1;
                    test.failedIdx = this.failedCount;
                }
            })
            .then(() => asFn(this.reporter)('afterTest', this, test));
    },

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.tests.forEach((test, idx) => test.defIdx = idx + 1);
                this.total = this.tests.length;
                this.runCount = 0;
                this.settledCount = 0;
                this.passedCount = 0;
                this.failedCount = 0;
                this.skippedCount = 0;
            })
            .then(() => asFn(this.reporter)('beforeAll', this))
            .then(() => {
                this.status = Test.PENDING;
                const syncTests = this.sync ? this.tests : this.tests.filter(isSync);
                const asyncTests = this.sync ? [] : this.tests.filter(isAsync);

                const testToFn = test => () => this.runTest(test);
                const syncFns = syncTests.map(testToFn);
                const asyncFns = asyncTests.map(testToFn);

                this.starttime = Date.now();
                return runSequential(syncFns).then(() => runParallel(asyncFns));
            })
            .then(() => {
                this.status = this.failedCount ? Test.FAILED : Test.PASSED;
                this.duration = Date.now() - this.starttime;
            })
            .then(() => asFn(this.reporter)('afterAll', this))
            .catch(err => asFn(this.reporter)('onError', this, err));

        return this.promise;
    }
};
