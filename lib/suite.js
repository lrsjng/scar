const {as_fn, run_seq, run_conc} = require('./util');
const Test = require('./test');

class Suite {
    constructor(options) {
        this.sync = false;
        this.reporter = null;
        this.filter = null;
        this.max_conc = 64;
        this.tests = [];
        Object.assign(this, options);
        this.status = Test.WAITING;
        this.starttime = null;
        this.duration = null;
        this.promise = null;
    }

    run_test(test) {
        return Promise.resolve()
            .then(() => as_fn(this.reporter)('before_test', this, test))
            .then(() => {
                this.run_count += 1;
                test.run_idx = this.run_count;
            })
            .then(() => test.run())
            .then(() => {
                this.settled_count += 1;
                test.settled_idx = this.settled_count;
                if (test.status === Test.PASSED) {
                    this.passed_count += 1;
                    test.passed_idx = this.passed_count;
                } else if (test.status === Test.SKIPPED) {
                    this.skipped_count += 1;
                    test.skipped_idx = this.skipped_count;
                } else {
                    this.failed_count += 1;
                    test.failed_idx = this.failed_count;
                }
            })
            .then(() => as_fn(this.reporter)('after_test', this, test));
    }

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.tests.forEach((test, idx) => {test.def_idx = idx + 1;});
                this.total = this.tests.length;
                this.filtered_tests = this.tests.filter(as_fn(this.filter || true));
                this.filtered_total = this.filtered_tests.length;
                this.run_count = 0;
                this.settled_count = 0;
                this.passed_count = 0;
                this.failed_count = 0;
                this.skipped_count = 0;
            })
            .then(() => as_fn(this.reporter)('before_all', this))
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;

                const test_to_fn = test => () => this.run_test(test);

                const tests = this.filtered_tests;
                const sync_tests = this.sync ? tests : tests.filter(t => !!t.sync);
                const async_tests = this.sync ? [] : tests.filter(t => !t.sync);

                const sync_fns = sync_tests.map(test_to_fn);
                const async_fns = async_tests.map(test_to_fn);

                return run_seq(sync_fns).then(() => run_conc(async_fns, this.max_conc));
            })
            .then(() => {
                this.status = this.failed_count ? Test.FAILED : Test.PASSED;
                this.duration = Date.now() - this.starttime;
            })
            .then(() => as_fn(this.reporter)('after_all', this))
            .then(() => this);

        return this.promise;
    }
}

module.exports = Suite;
