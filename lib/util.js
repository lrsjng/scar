const EX = module.exports = {};

EX.isBoolean = x => typeof x === 'boolean';
EX.isNumber = x => typeof x === 'number';
EX.isString = x => typeof x === 'string';
EX.isArray = x => Array.isArray(x);
const isFn = EX.isFn = x => typeof x === 'function';
EX.isPlainObject = x => Object.prototype.toString.call(x) === '[object Object]'; // eslint-disable-line prefer-reflect

EX.asFn = x => isFn(x) ? x : () => x;
