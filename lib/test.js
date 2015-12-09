const {isString, isNumber, isFn, asFn} = require('./util');

const Test = module.exports = (...args) => {
    return Object.assign(Object.create(Test.prototype), {
        desc: '[No Description]',
        fn: null,
        skip: false,
        sync: false,
        timeout: 1000
    }, ...args.map(arg => {
        if (isString(arg)) {
            return {desc: arg};
        }
        if (isFn(arg)) {
            return {fn: arg};
        }
        return arg;
    }), {
        status: Test.WAITING,
        err: null,
        starttime: null,
        duration: null,
        promise: null
    });
};

Test.WAITING = 'WAITING';
Test.PENDING = 'PENDING';
Test.PASSED = 'PASSED';
Test.FAILED = 'FAILED';
Test.SKIPPED = 'SKIPPED';

const promisedTimeout = millis => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(`Timeout (${millis}ms)`)), millis);
    });
};

Test.prototype = {
    constructor: Test,

    __TRACE_MARKER__() {
        return asFn(this.fn)();
    },

    runFn() {
        const promise = Promise.resolve().then(() => this.__TRACE_MARKER__());

        if (isNumber(this.timeout) && this.timeout > 0) {
            return Promise.race([promise, promisedTimeout(this.timeout)]);
        }

        return promise;
    },

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;
                if (!this.skip) {
                    return this.runFn();
                }
            })
            .then(() => {
                this.status = this.skip ? Test.SKIPPED : Test.PASSED;
            })
            .catch(err => {
                this.status = Test.FAILED;
                this.err = err;
            })
            .then(() => {
                this.duration = Date.now() - this.starttime;
            });
        return this.promise;
    }
};
