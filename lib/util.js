const isBoolean = x => typeof x === 'boolean';
const isNumber = x => typeof x === 'number';
const isString = x => typeof x === 'string';
const isArray = x => Array.isArray(x);
const isFn = x => typeof x === 'function';
const asFn = x => isFn(x) ? x : () => x;
const isPlainObject = x => Object.prototype.toString.call(x) === '[object Object]'; // eslint-disable-line prefer-reflect

const runSequential = fns => fns.reduce((p, fn) => p.then(fn), Promise.resolve());

const runConcurrent = (fns, max) => {
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

module.exports = {
    isBoolean,
    isNumber,
    isString,
    isArray,
    isFn,
    isPlainObject,
    asFn,
    runSequential,
    runConcurrent
};
