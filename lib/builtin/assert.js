const {is_fn, is_regexp} = require('../util');
const insp = require('./insp');
const Err = require('../err');

const get_type = x => Reflect.apply(Object.prototype.toString, x, []);

const deep_equal = (a, b) => {
    if (a === b || Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }

    let type = typeof a;
    if (type !== 'object' && type === typeof b) {
        return a === b;
    }

    type = get_type(a);
    if (type !== get_type(b)) {
        return false;
    }

    if (type === '[object Array]') {
        return a.length === b.length && a.every((_, idx) => {
            return deep_equal(a[idx], b[idx]);
        });
    }

    if (type === '[object Object]') {
        const keys = Object.keys(a);
        return deep_equal(keys.sort(), Object.keys(b).sort()) && keys.every(key => {
            return deep_equal(a[key], b[key]);
        });
    }

    return false;
};

const asrt = (expr, message, drop = 2) => {
    if (!expr) {
        throw new Err({name: 'AssertionError', message, drop});
    }
};

const asrt_err = (err, exp, msg) => {
    if (exp === undefined) {
        return;
    }

    if (is_regexp(exp)) {
        err = String(err);
        if (exp.test(err)) {
            return;
        }
        asrt(false, msg || `expected error ${insp(err)} to be matched by ${insp(exp)}`, 3);
    }

    if (is_fn(exp)) {
        exp(err);
        return;
    }

    if (err === exp) {
        return;
    }

    asrt(false, msg || `expected error ${insp(err)} to be ${insp(exp)}`, 3);
};

const assert = (expr, msg) => {
    asrt(expr, msg);
};

assert.fail = msg => {
    asrt(false, msg);
};

assert.ok = (act, msg) => {
    asrt(!!act, msg || `expected ${insp(act)} to be truthy`);
};

assert.not_ok = (act, msg) => {
    asrt(!act, msg || `expected ${insp(act)} to be falsy`);
};
assert.notOk = assert.not_ok;

assert.equal = (act, exp, msg) => {
    asrt(act === exp, msg || `expected ${insp(act)} to equal ${insp(exp)}`);
};

assert.not_equal = (act, ref, msg) => {
    asrt(act !== ref, msg || `expected ${insp(act)} not to equal ${insp(ref)}`);
};
assert.notEqual = assert.not_equal;

assert.deep_equal = (act, exp, msg) => {
    asrt(deep_equal(act, exp), msg || `expected ${insp(act)} to deeply equal ${insp(exp)}`);
};
assert.deepEqual = assert.deep_equal;

assert.not_deep_equal = (act, ref, msg) => {
    asrt(!deep_equal(act, ref), msg || `expected ${insp(act)} not to deeply equal ${insp(ref)}`);
};
assert.notDeepEqual = assert.not_deep_equal;

assert.throws = (fn, exp, msg) => {
    asrt(is_fn(fn), `expected ${insp(fn)} to be a function`);

    const none = {};
    let val = none;

    try {
        val = fn();
    } catch (err) {
        asrt_err(err, exp, msg);
    }

    if (val !== none) {
        asrt(false, msg || `expected error but returned ${val}`);
    }
};

assert.rejects = (promise, exp, msg) => {
    asrt(promise && is_fn(promise.then), `expected ${insp(promise)} to be a thenable`);

    return Promise.resolve(promise).then(
        val => asrt(false, msg || `expected error but returned ${val}`),
        err => asrt_err(err, exp, msg)
    );
};

module.exports = assert;
