const {as_fn, run_seq, run_conc} = require('./util');
const Test = require('./test');

const is_sync = test => !!test.sync;
const is_async = test => !test.sync;

class Suite {
    constructor(tests = [], options) {
        Object.assign(this, {
            sync: false,
            reporter: null,
            filter: null,
            max_conc: 100
        }, options, {
            tests,
            status: Test.WAITING,
            starttime: null,
            duration: null,
            promise: null
        });
    }

    run_test(test) {
        return Promise.resolve()
            .then(() => as_fn(this.reporter)('beforeTest', this, test))
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
            .then(() => as_fn(this.reporter)('after_test', this, test));
    }

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.tests.forEach((test, idx) => {test.defIdx = idx + 1;});
                this.total = this.tests.length;
                this.filteredTests = this.tests.filter(as_fn(this.filter || true));
                this.filteredTotal = this.filteredTests.length;
                this.runCount = 0;
                this.settledCount = 0;
                this.passedCount = 0;
                this.failedCount = 0;
                this.skippedCount = 0;
            })
            .then(() => as_fn(this.reporter)('before_all', this))
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;

                const testToFn = test => () => this.run_test(test);

                const tests = this.filteredTests;
                const syncTests = this.sync ? tests : tests.filter(is_sync);
                const asyncTests = this.sync ? [] : tests.filter(is_async);

                const syncFns = syncTests.map(testToFn);
                const asyncFns = asyncTests.map(testToFn);

                return run_seq(syncFns).then(() => run_conc(asyncFns, this.max_conc));
            })
            .then(() => {
                this.status = this.failedCount ? Test.FAILED : Test.PASSED;
                this.duration = Date.now() - this.starttime;
            })
            .then(() => as_fn(this.reporter)('after_all', this))
            .then(() => this);

        return this.promise;
    }
}

module.exports = Suite;
