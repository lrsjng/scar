const asFn = x => typeof x === 'function' ? x : () => x;

const spy = fn => {
    const calls = [];
    const wrapper = (...args) => {
        const call = {idx: calls.length, args};
        calls.push(call);
        call.time = Date.now();
        call.ret = asFn(fn)(...args);
        call.done = Date.now();
    };
    wrapper.calls = calls;
    return wrapper;
};

module.exports = spy;
