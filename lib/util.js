const is_bool = x => typeof x === 'boolean';
const is_num = x => typeof x === 'number';
const is_str = x => typeof x === 'string';
const is_arr = x => Array.isArray(x);
const is_fn = x => typeof x === 'function';
const as_fn = x => is_fn(x) ? x : () => x;
const is_plain_obj = x => Reflect.apply(Object.prototype.toString, x, []) === '[object Object]';

const run_seq = fns => fns.reduce((p, fn) => p.then(fn), Promise.resolve());

const run_conc = (fns, max) => {
    if (!is_num(max) || max < 2) {
        return run_seq(fns);
    }

    return new Promise(resolve => {
        const total = fns.length;
        let settled = 0;
        let pending = 0;
        let next = 0;

        const run_fn = fn => {
            return Promise.resolve()
                .then(fn)
                .catch(() => null)
                .then(() => {
                    pending -= 1;
                    settled += 1;
                });
        };

        const check = () => {
            while (next < total && pending < max) {
                const fn = fns[next];
                next += 1;
                pending += 1;
                run_fn(fn).then(check);
            }
            if (settled === total) {
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
    is_plain_obj,
    as_fn,
    run_seq,
    run_conc
};
