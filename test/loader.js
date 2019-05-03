const promised_timeout = (timeout, fail) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => fail ? reject(fail) : resolve('promised_timeout.resolve'), timeout);
    });
};

module.exports = {
    promised_timeout,
    lib: require('../lib'),
    format_err: require('../lib/err'),
    reporter: require('../lib/reporter'),
    Scar: require('../lib/scar'),
    Suite: require('../lib/suite'),
    Test: require('../lib/test'),
    util: require('../lib/util')
};
