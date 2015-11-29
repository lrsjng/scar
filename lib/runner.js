const {isString, isNumber, isFn, isPlainObject, asFn} = require('./util');

const runParallel = fns => {
    return Promise.all(fns.map(fn => fn()));
};

const runSequential = fns => {
    let promise = Promise.resolve();
    fns.forEach(fn => promise = promise.then(fn));
    return promise;
};

const Test = (...args) => {
    return Object.assign({}, ...args.map(arg => {
        if (isString(arg)) {
            return {desc: arg};
        }
        if (isFn(arg)) {
            return {fn: arg};
        }
        if (isPlainObject(arg)) {
            return arg;
        }
    }));
};

const TestRunner = test => {
    return Object.assign(Object.create(TestRunner.prototype), {
        desc: '[No Description]',
        fn: null,
        skip: false,
        sync: false,
        timeout: 1000
    }, test, {
        err: null,
        starttime: null,
        duration: null,
        promise: null
    });
};

TestRunner.prototype = {
    run(callback) {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                return asFn(callback)('beforeTest', this);
            })
            .then(() => {
                let promise = Promise.resolve().then(() => {
                    if (!this.skip) {
                        this.starttime = Date.now();
                        return asFn(this.fn)(this);
                    }
                });

                if (isNumber(this.timeout) && this.timeout > 0) {
                    promise = Promise.race([
                        promise,
                        new Promise((resolve, reject) => {
                            setTimeout(() => reject(new Error('Test Timeout')), this.timeout);
                        })
                    ]);
                }

                return promise.catch(err => {
                    this.err = err;
                });
            })
            .then(() => {
                this.duration = this.skip ? 0 : Date.now() - this.starttime;
                return asFn(callback)('afterTest', this);
            });
        return this.promise;
    },

    passed() {
        return this.starttime !== null && this.duration !== null && !this.err;
    },

    failed() {
        return this.starttime !== null && this.duration !== null && !!this.err;
    },

    skipped() {
        return this.starttime === null && this.duration !== null;
    },

    pending() {
        return this.duration === null;
    }
};

const TestsRunner = (tests = [], options) => {
    return Object.assign(Object.create(TestsRunner.prototype), {
        sync: false
    }, options, {
        runners: tests.map(TestRunner),
        starttime: null,
        duration: null,
        promise: null
    });
};

TestsRunner.prototype = {
    run(callback) {
        const runFn = runner => () => runner.run(callback);
        const isSync = runner => runner.sync;
        const isAsync = runner => !runner.sync;

        this.promise = this.promise || Promise.resolve()
            .then(() => {
                return asFn(callback)('beforeAll', this);
            })
            .then(() => {
                this.starttime = Date.now();

                if (this.sync) {
                    return runSequential(this.runners.map(runFn));
                }

                const syncFns = this.runners.filter(isSync).map(runFn);
                const asyncFns = this.runners.filter(isAsync).map(runFn);
                return runSequential(syncFns).then(() => runParallel(asyncFns));
            })
            .then(() => {
                this.duration = Date.now() - this.starttime;
                return asFn(callback)('afterAll', this);
            });
        return this.promise;
    }
};

module.exports = {Test, TestRunner, TestsRunner};
