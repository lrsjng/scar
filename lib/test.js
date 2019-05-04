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
        this.desc = '[No Description]';
        this.fn = null;
        this.skip = false;
        this.sync = false;
        this.timeout = null;
        args.forEach(arg => {
            if (is_str(arg)) {
                this.desc = arg;
            } else if (is_fn(arg)) {
                this.fn = arg;
            } else {
                Object.assign(this, arg);
            }
        });
        this.status = Test.WAITING;
        this.err = null;
        this.starttime = null;
        this.duration = null;
        this.promise = null;
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
