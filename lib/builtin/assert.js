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

const check_err = (is_err, act, exp, msg) => {
    if (!is_err) {
        return {act, exp, msg: msg || `expected error but returned ${act}`};
    }

    if (exp === undefined) {
        return null;
    }

    if (is_regexp(exp)) {
        act = String(act);
        if (exp.test(act)) {
            return null;
        }
        return {act, exp, msg: msg || `expected error ${insp(act)} to be matched by ${insp(exp)}`};
    }

    if (is_fn(exp)) {
        exp(act);
        return null;
    }

    if (act === exp) {
        return null;
    }

    return {act, exp, msg: msg || `expected error ${insp(act)} to be ${insp(exp)}`};
};

const raise = (props, drop = 2) => {
    if (props && !props.expr) {
        throw new Err({name: 'AssertionError'}, props.msg, props, drop);
    }
};

const assert = (expr, msg) => {
    raise({expr, msg});
};

assert.fail = msg => {
    raise({msg});
};

assert.ok = (act, msg = `expected ${insp(act)} to be truthy`) => {
    raise({expr: !!act, act, msg});
};

assert.not_ok = (act, msg = `expected ${insp(act)} to be falsy`) => {
    raise({expr: !act, act, msg});
};
assert.notOk = assert.not_ok;

assert.equal = (act, exp, msg = `expected ${insp(act)} to equal ${insp(exp)}`) => {
    raise({expr: act === exp, act, exp, msg});
};

assert.not_equal = (act, ref, msg = `expected ${insp(act)} not to equal ${insp(ref)}`) => {
    raise({expr: act !== ref, act, ref, msg});
};
assert.notEqual = assert.not_equal;

assert.deep_equal = (act, exp, msg = `expected ${insp(act)} to deeply equal ${insp(exp)}`) => {
    raise({expr: deep_equal(act, exp), act, exp, msg});
};
assert.deepEqual = assert.deep_equal;

assert.not_deep_equal = (act, ref, msg = `expected ${insp(act)} not to deeply equal ${insp(ref)}`) => {
    raise({expr: !deep_equal(act, ref), act, ref, msg});
};
assert.notDeepEqual = assert.not_deep_equal;

assert.throws = (fn, exp, msg) => {
    raise({expr: is_fn(fn), msg: 'assert.throws(): first arg must be a function'});

    const none = {};
    let val = none;

    try {
        val = fn();
    } catch (err) {
        raise(check_err(true, err, exp, msg));
    }

    if (val !== none) {
        raise(check_err(false, val, exp, msg));
    }
};

assert.rejects = (promise, exp, msg) => {
    raise({expr: promise && is_fn(promise.then), msg: 'assert.rejects(): first arg must be a thenable'});

    return Promise.resolve(promise).then(
        val => raise(check_err(false, val, exp, msg), 2),
        err => raise(check_err(true, err, exp, msg), 2)
    );
};

module.exports = assert;
