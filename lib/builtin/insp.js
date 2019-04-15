const {is_str, is_fn, is_arr, is_plain_obj} = require('../util');

const insp = (x, visited = []) => {
    if (visited.includes(x)) {
        return '[circular]';
    }
    visited.push(x);

    if (is_str(x)) {
        return `'${x}'`;
    }
    if (is_fn(x)) {
        return String(x).split(')')[0] + ')';
    }
    if (is_arr(x)) {
        return '[' + Array.from(x, el => insp(el, visited)).join(', ') + ']';
    }
    if (is_plain_obj(x)) {
        return '{' + Object.keys(x).map(key => `${key}: ${insp(x[key], visited)}`).join(', ') + '}';
    }
    return String(x);
};

module.exports = insp;
