const {isString, isFn, isArray, isPlainObject} = require('../util');

const insp = x => {
    if (isString(x)) {
        return `'${x}'`;
    }
    if (isFn(x)) {
        return String(x).split(')')[0] + ')';
    }
    if (isArray(x)) {
        return '[' + Array.from(x, el => insp(el)).join(', ') + ']';
    }
    if (isPlainObject(x)) {
        return '{' + Object.keys(x).map(key => `${key}: ${insp(x[key])}`).join(', ') + '}';
    }
    return String(x);
};

module.exports = insp;
