const {is_str, is_num, is_fn, as_fn} = require('./util');

const promised_timeout = millis => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(`Timeout (${millis}ms)`)), millis);
    });
};

class Test {
    constructor(...args) {
        Object.assign(this, {
            desc: '[No Description]',
            fn: null,
            skip: false,
            sync: false,
            timeout: null
        }, ...args.map(arg => {
            return is_str(arg) ? {desc: arg} : is_fn(arg) ? {fn: arg} : arg;
        }), {
            status: Test.WAITING,
            err: null,
            starttime: null,
            duration: null,
            promise: null
        });
    }

    __TRACE_MARKER__() {
        return as_fn(this.fn)();
    }

    run_fn() {
        const promise = Promise.resolve().then(() => this.__TRACE_MARKER__());

        if (is_num(this.timeout) && this.timeout > 0) {
            return Promise.race([promise, promised_timeout(this.timeout)]);
        }

        return promise;
    }

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;
                if (!this.skip) {
                    return this.run_fn();
                }
                return null;
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
}

Test.WAITING = 'WAITING';
Test.PENDING = 'PENDING';
Test.PASSED = 'PASSED';
Test.FAILED = 'FAILED';
Test.SKIPPED = 'SKIPPED';

module.exports = Test;
