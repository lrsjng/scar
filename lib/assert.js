const insp = require('./insp');
const Err = require('./err');
const NO_ERROR = {};

const raise = props => {
    if (!props.expr) {
        throw Err(props.msg, props, 3);
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

assert.equal = (act, exp, msg = `expected ${insp(act)} to be ${insp(exp)}`) => {
    raise({expr: act === exp, act, exp, msg});
};

assert.notEqual = (act, ref, msg = `expected ${insp(act)} not to be ${insp(ref)}`) => {
    raise({expr: act !== ref, act, ref, msg});
};

assert.throws = (fn, exp, msg) => {
    let act = NO_ERROR;

    try {
        fn();
    } catch (e) {
        act = e;
    }

    if (act === NO_ERROR) {
        raise({exp, msg: msg || 'expected to throw'});
    }

    if (exp === undefined) {
        return;
    }

    if (exp instanceof RegExp) {
        act = String(act);
        if (exp.test(act)) {
            return;
        }
        raise({act, exp, msg: msg || `expected error ${insp(act)} to be matched by ${insp(exp)}`});
    }

    if (act !== exp) {
        raise({act, exp, msg: msg || `expected error ${insp(act)} to be ${insp(exp)}`});
    }
};
