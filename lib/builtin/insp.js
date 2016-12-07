const {isString, isFn, isArray, isPlainObject} = require('../util');

const insp = (x, visited = []) => {
    if (visited.includes(x)) {
        return '[circular]';
    }
    visited.push(x);

    if (isString(x)) {
        return `'${x}'`;
    }
    if (isFn(x)) {
        return String(x).split(')')[0] + ')';
    }
    if (isArray(x)) {
        return '[' + Array.from(x, el => insp(el, visited)).join(', ') + ']';
    }
    if (isPlainObject(x)) {
        return '{' + Object.keys(x).map(key => `${key}: ${insp(x[key], visited)}`).join(', ') + '}';
    }
    return String(x);
};

module.exports = insp;
