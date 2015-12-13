const insp = require('./insp');
const Err = require('./err');
const NO_ERROR = {};

const getType = x => {
    return Object.prototype.toString.call(x); // eslint-disable-line prefer-reflect
};

const deepEqual = (a, b) => {
    if (a === b || Number.isNaN(a) && Number.isNaN(b)) {
        return true;
    }

    let type = typeof a;
    if (type !== 'object' && type === typeof b) {
        return a === b;
    }

    type = getType(a);
    if (type !== getType(b)) {
        return false;
    }

    if (type === '[object Array]') {
        return a.length === b.length && a.every((_, idx) => {
            return deepEqual(a[idx], b[idx]);
        });
    }

    if (type === '[object Object]') {
        const keys = Object.keys(a);
        return deepEqual(keys.sort(), Object.keys(b).sort()) && keys.every(key => {
            return deepEqual(a[key], b[key]);
        });
    }

    return false;
};

const checkError = (isError, act, exp, msg) => {
    if (!isError) {
        return {act, exp, msg: msg || `expected error but returned ${act}`};
    }

    if (exp === undefined) {
        return null;
    }

    if (exp instanceof RegExp) {
        act = String(act);
        if (exp.test(act)) {
            return null;
        }
        return {act, exp, msg: msg || `expected error ${insp(act)} to be matched by ${insp(exp)}`};
    }

    if (typeof exp === 'function') {
        exp(act);
        return null;
    }

    if (act !== exp) {
        return {act, exp, msg: msg || `expected error ${insp(act)} to be ${insp(exp)}`};
    }

    return null;
};

const raise = (props, drop = 3) => {
    if (props && !props.expr) {
        throw Err(props.msg, props, drop);
    }
};

const assert = module.exports = (expr, msg) => {
    raise({expr, msg});
};

assert.fail = msg => {
    raise({msg});
};

assert.ok = (act, msg = `expected ${insp(act)} to be truthy`) => {
    raise({expr: !!act, act, msg});
};

assert.notOk = (act, msg = `expected ${insp(act)} to be falsy`) => {
    raise({expr: !act, act, msg});
};

assert.equal = (act, exp, msg = `expected ${insp(act)} to equal ${insp(exp)}`) => {
    raise({expr: act === exp, act, exp, msg});
};

assert.notEqual = (act, ref, msg = `expected ${insp(act)} not to equal ${insp(ref)}`) => {
    raise({expr: act !== ref, act, ref, msg});
};

assert.deepEqual = (act, exp, msg = `expected ${insp(act)} to deeply equal ${insp(exp)}`) => {
    raise({expr: deepEqual(act, exp), act, exp, msg});
};

assert.notDeepEqual = (act, ref, msg = `expected ${insp(act)} not to deeply equal ${insp(ref)}`) => {
    raise({expr: !deepEqual(act, ref), act, ref, msg});
};

assert.throws = (fn, exp, msg) => {
    let val = NO_ERROR;

    try {
        val = fn();
    } catch (err) {
        raise(checkError(true, err, exp, msg));
    }

    if (val !== NO_ERROR) {
        raise(checkError(false, val, exp, msg));
    }
};

assert.rejects = (promise, exp, msg) => {
    return Promise.resolve(promise)
        .then(
            val => {
                raise(checkError(false, val, exp, msg), 2);
            },
            err => {
                raise(checkError(true, err, exp, msg), 2);
            }
        );
};
