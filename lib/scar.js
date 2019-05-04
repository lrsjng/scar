const Test = require('./test');
const Suite = require('./suite');
const reporter = require('./reporter');
const cli = require('./cli');

const scar = () => {
    const tests = [];

    const test = (...args) => {
        tests.push(new Test(...args));
    };

    test.skip = (...args) => test(...args, {skip: true});
    test.sync = (...args) => test(...args, {sync: true});

    test.run = options => {
        options = {reporter, ...options, tests};
        return new Suite(options).run();
    };

    test.cli = options => cli(test.run, options);

    return test;
};

module.exports = scar;
