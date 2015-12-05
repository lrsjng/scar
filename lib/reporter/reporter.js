const Err = require('../err');

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
        let str = `\n  ${suite.total} tests defined`;
        if (suite.filteredTotal !== suite.total) {
            str += `, filtered down to ${suite.filteredTotal} tests`;
        }
        str += '\n ';
        this.log(str);
    },

    afterTest(suite, test) {
        const status = test.status === 'SKIPPED' ? 's' : test.status === 'FAILED' ? 'F' : ' ';
        this.log(`  ${status}  ${test.desc}`);
    },

    afterAll(suite) {
        suite.tests.filter(test => test.status === 'FAILED').forEach(test => {
            const err = Err(test.err);
            this.log(`\n  [${test.failedIdx}] ${test.desc}\n${err.format('    ')}`);
        });
        let resume = '\n  ';
        if (suite.failedCount) {
            resume += `${suite.failedCount} failed - `;
        }
        if (suite.skippedCount) {
            resume += `${suite.skippedCount} skipped - `;
        }
        resume += `${suite.passedCount} passed (${suite.duration}ms)\n `;
        this.log(resume);
    },

    onError(suite, err) {
        this.log('\n[Unhandled Error]');
        this.log(Err(err).toString());
    }
};
