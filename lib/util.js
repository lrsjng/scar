const is_bool = x => typeof x === 'boolean';
const is_num = x => typeof x === 'number';
const is_str = x => typeof x === 'string';
const is_arr = x => Array.isArray(x);
const is_fn = x => typeof x === 'function';
const as_fn = x => is_fn(x) ? x : () => x;
const is_regexp = x => x instanceof RegExp;
const is_plain_obj = x => Reflect.apply(Object.prototype.toString, x, []) === '[object Object]';

const run_seq = fns => fns.reduce((p, fn) => p.then(fn), Promise.resolve());

const run_conc = (fns, max = 1024) => {
    if (max < 2) {
        return run_seq(fns);
    }

    return new Promise(resolve => {
        fns = Array.from(fns);
        let awaiting = fns.length;
        let pending = 0;

        const run_fn = fn => {
            return Promise.resolve()
                .then(fn)
                .catch(() => {})
                .then(() => {
                    pending -= 1;
                    awaiting -= 1;
                });
        };

        const check = () => {
            while (fns.length && pending < max) {
                run_fn(fns.shift()).then(check);
                pending += 1;
            }
            if (!awaiting) {
                resolve();
            }
        };

        check();
    });
};

module.exports = {
    is_bool,
    is_num,
    is_str,
    is_arr,
    is_fn,
    is_regexp,
    is_plain_obj,
    as_fn,
    run_seq,
    run_conc
};
