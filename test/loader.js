const promisedTimeout = (timeout, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => fail ? reject(fail) : resolve('promisedTimeout.resolve'), timeout);
    });
};

module.exports = {
    promisedTimeout,
    lib: require('../lib'),
    Err: require('../lib/err'),
    Reporter: require('../lib/reporter'),
    Scar: require('../lib/scar'),
    Suite: require('../lib/suite'),
    Test: require('../lib/test'),
    util: require('../lib/util')
};
