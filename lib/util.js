const EX = module.exports = {};

EX.isBoolean = x => typeof x === 'boolean';
const isNumber = EX.isNumber = x => typeof x === 'number';
EX.isString = x => typeof x === 'string';
EX.isArray = x => Array.isArray(x);
const isFn = EX.isFn = x => typeof x === 'function';
EX.isPlainObject = x => Object.prototype.toString.call(x) === '[object Object]'; // eslint-disable-line prefer-reflect

EX.asFn = x => isFn(x) ? x : () => x;

const runSequential = EX.runSequential = fns => {
    return fns.reduce((promise, fn) => promise.then(fn), Promise.resolve());
};

EX.runConcurrent = (fns, max) => {
    if (!isNumber(max) || max < 2) {
        return runSequential(fns);
    }

    return new Promise(resolve => {
        const total = fns.length;
        let settled = 0;
        let pending = 0;
        let next = 0;

        const runFn = fn => {
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
                runFn(fn).then(check);
            }
            if (settled === total) {
                resolve();
            }
        };

        check();
    });
};
