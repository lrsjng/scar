const {asFn, runSequential, runConcurrent} = require('./util');
const Test = require('./test');

const isSync = test => !!test.sync;
const isAsync = test => !test.sync;

const Suite = module.exports = (tests = [], options) => {
    return Object.assign(Object.create(Suite.prototype), {
        sync: false,
        reporter: null,
        filter: null,
        maxConcurrent: 100
    }, options, {
        tests,
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
                this.filteredTests = this.tests.filter(asFn(this.filter || true));
                this.filteredTotal = this.filteredTests.length;
                this.runCount = 0;
                this.settledCount = 0;
                this.passedCount = 0;
                this.failedCount = 0;
                this.skippedCount = 0;
            })
            .then(() => asFn(this.reporter)('beforeAll', this))
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;

                const testToFn = test => () => this.runTest(test);

                const tests = this.filteredTests;
                const syncTests = this.sync ? tests : tests.filter(isSync);
                const asyncTests = this.sync ? [] : tests.filter(isAsync);

                const syncFns = syncTests.map(testToFn);
                const asyncFns = asyncTests.map(testToFn);

                return runSequential(syncFns).then(() => runConcurrent(asyncFns, this.maxConcurrent));
            })
            .then(() => {
                this.status = this.failedCount ? Test.FAILED : Test.PASSED;
                this.duration = Date.now() - this.starttime;
            })
            .then(() => asFn(this.reporter)('afterAll', this))
            .then(() => this);

        return this.promise;
    }
};
