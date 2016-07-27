const Err = require('../err');
const {setTitle, setFavIcon} = require('./window');

const Reporter = () => {
    const inst = Object.assign(Object.create(Reporter.prototype), {
        log: console.log.bind(console),
        callback: (...args) => inst.handle(...args)
    });
    return inst;
};

Reporter.prototype = {
    constructor: Reporter,

    handle(type, ...args) {
        if (['beforeAll', 'afterTest', 'afterAll'].indexOf(type) >= 0) {
            return this[type](...args);
        }
        return null;
    },

    beforeAll(suite) {
        let str = 'running ';
        if (suite.filteredTotal !== suite.total) {
            str += `${suite.filteredTotal} of `;
        }
        str += `${suite.total} tests\n `;
        this.log(str);
        setTitle(`running ${suite.filteredTotal} tests...`);
        setFavIcon('GREY');

        // take time to update icon
        return new Promise(resolve => setTimeout(() => resolve(), 100));
    },

    afterTest(suite, test) {
        const status = test.status === 'PASSED' ? ' ok ' : test.status === 'SKIPPED' ? 'skip' : 'FAIL';
        this.log(` ${status} ${test.desc}`);
    },

    afterAll(suite) {
        suite.tests.filter(test => test.status === 'FAILED').forEach(test => {
            const err = Err(test.err);
            this.log(`\n[${test.failedIdx}] ${test.desc}\n${err.format()}`);
        });
        let resume = '\n';
        if (suite.failedCount) {
            resume += `${suite.failedCount} failed, `;
        }
        if (suite.skippedCount) {
            resume += `${suite.skippedCount} skipped, `;
        }
        resume += `${suite.passedCount} passed (${suite.duration}ms)`;
        this.log(resume);
        setTitle(resume);
        setFavIcon(suite.failedCount ? 'RED' : 'GREEN');
    }
};

module.exports = Reporter;
