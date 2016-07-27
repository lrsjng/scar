const {asFn} = require('./util');

const spy = fn => {
    const calls = [];

    function wrapper() {
        'use strict'; // eslint-disable-line strict

        const call = {
            idx: calls.length,
            time: Date.now(),
            ctx: this, // eslint-disable-line no-invalid-this
            args: Array.from(arguments)
        };

        calls.push(call);
        call.ret = asFn(fn)(call, calls);
        call.done = Date.now();

        return call.ret;
    }

    wrapper.calls = calls;
    return wrapper;
};

module.exports = spy;
