const Err = require('../err');
const {setTitle, setFavIcon} = require('./window');

const Reporter = module.exports = () => {
    const inst = Object.assign(Object.create(Reporter.prototype), {
        log: console.log.bind(console),
        callback: (...args) => inst.handle(...args)
    });
    return inst;
};

Reporter.prototype = {
    constructor: Reporter,

    handle(type, ...args) {
        if (['beforeAll', 'afterTest', 'afterAll', 'onError'].indexOf(type) >= 0) {
            this[type](...args);
        }
    },

    beforeAll(suite) {
        let str = `running `;
        if (suite.filteredTotal !== suite.total) {
            str += `${suite.filteredTotal} of `;
        }
        str += `${suite.total} tests\n `;
        this.log(str);
        setTitle(`0 / ${suite.filteredTotal}`);
        setFavIcon('GREY');
    },

    afterTest(suite, test) {
        const status = test.status === 'SKIPPED' ? 'skip' : test.status === 'FAILED' ? 'FAIL' : ' ok ';
        this.log(` ${status} ${test.desc}`);
        setTitle(`${suite.settledCount} / ${suite.filteredTotal}`);
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
