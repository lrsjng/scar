const Err = require('../err');
const {set_title, set_fav_icon} = require('./window');

class Reporter {
    constructor() {
        this.log = console.log.bind(console);
        this.callback = this.handle.bind(this);
    }

    handle(type, ...args) {
        if (['before_all', 'after_test', 'after_all'].includes(type)) {
            return this[type](...args);
        }
        return null;
    }

    before_all(suite) {
        let str = 'running ';
        if (suite.filtered_total !== suite.total) {
            str += `${suite.filtered_total} of `;
        }
        str += `${suite.total} tests\n `;
        this.log(str);
        set_title(`running ${suite.filtered_total} tests...`);
        set_fav_icon('GREY');

        // take time to update icon
        return new Promise(resolve => setTimeout(() => resolve(), 100));
    }

    after_test(suite, test) {
        const status = test.status === 'PASSED' ? ' ok ' : test.status === 'SKIPPED' ? 'skip' : 'FAIL';
        this.log(` ${status} ${test.desc}`);
    }

    after_all(suite) {
        suite.tests.filter(test => test.status === 'FAILED').forEach(test => {
            const str = new Err(test.err).format('  ', true, false);
            this.log(`\n[${test.failed_idx}] ${test.desc}\n${str}`);
        });
        let resume = '\n';
        if (suite.failed_count) {
            resume += `${suite.failed_count} failed, `;
        }
        if (suite.skipped_count) {
            resume += `${suite.skipped_count} skipped, `;
        }
        resume += `${suite.passed_count} passed (${suite.duration}ms)`;
        this.log(resume);
        set_title(resume);
        set_fav_icon(suite.failed_count ? 'RED' : 'GREEN');
    }
}

module.exports = Reporter;
