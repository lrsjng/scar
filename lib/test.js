const {is_str, is_num, is_fn, as_fn} = require('./util');

const timeout = (promise, millis) => {
    if (!is_num(millis) || millis <= 0) {
        return promise;
    }
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error(`Timeout (${millis}ms)`)), millis);
        })
    ]);
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

    run() {
        this.promise = this.promise || Promise.resolve()
            .then(() => {
                this.starttime = Date.now();
                this.status = Test.PENDING;

                if (this.skip) {
                    return null;
                }

                const pr = Promise.resolve().then(() => this.__TRACE_MARKER__());
                return timeout(pr, this.timeout);
            })
            .finally(() => {
                this.status = this.skip ? Test.SKIPPED : Test.PASSED;
                this.duration = Date.now() - this.starttime;
            })
            .catch(err => {
                this.status = Test.FAILED;
                this.err = err;
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
