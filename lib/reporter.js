const Err = require('./err');
const Test = require('./test');

const DOC = global.window && global.window.document;
const ICON_TPL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3wsZER*AAAAAElFTkSuQmCC';
const ICON_RED = ICON_TPL.replace('*', 'Y0VbWlewAAAB1JREFUOMtj/OJs9p+BAsDEQCEYNWDUgFEDBosBABZOAow9yV0y');
const ICON_GREEN = ICON_TPL.replace('*', 'kM+i8BKgAAAB1JREFUOMtj9Fkf8J+BAsDEQCEYNWDUgFEDBosBAIuhAmqCXURi');
const ICON_GREY = ICON_TPL.replace('*', 'kjUf48cwAAAB1JREFUOMtjDA0N/c9AAWBioBCMGjBqwKgBg8UAAFduAh79mcom');

const log = x => console.log(x);
const noop = () => null;
const set_title = !DOC ? noop : title => {DOC.title = title;};
const set_fav_icon = !DOC ? noop : (() => {
    const head = DOC.querySelector('head');
    const rel = 'shortcut icon';
    return href => {
        const old_el = head.querySelector(`link[rel="${rel}"]`);
        if (old_el) {
            head.removeChild(old_el);
        }
        const el = DOC.createElement('link');
        el.rel = rel;
        el.href = href;
        head.appendChild(el);
    };
})();

class Reporter {
    before_all(suite) {
        let str = 'running ';
        if (suite.filtered_total !== suite.total) {
            str += `${suite.filtered_total} of `;
        }
        str += `${suite.total} tests\n `;
        log(str);
        set_title(`running ${suite.filtered_total} tests...`);
        set_fav_icon(ICON_GREY);

        // take time to update icon
        return new Promise(resolve => setTimeout(() => resolve(), 100));
    }

    before_test() {}

    after_test(suite, test) {
        const status = test.status === Test.PASSED ? ' ok ' : test.status === Test.SKIPPED ? 'skip' : 'FAIL';
        log(` ${status} ${test.desc}`);
    }

    after_all(suite) {
        suite.tests.filter(test => test.status === Test.FAILED).forEach(test => {
            const str = new Err(test.err).format('  ', true, false);
            log(`\n[${test.failed_idx}] ${test.desc}\n${str}`);
        });
        let resume = '\n';
        if (suite.failed_count) {
            resume += `${suite.failed_count} failed, `;
        }
        if (suite.skipped_count) {
            resume += `${suite.skipped_count} skipped, `;
        }
        resume += `${suite.passed_count} passed (${suite.duration}ms)`;
        log(resume);
        set_title(resume);
        set_fav_icon(suite.failed_count ? ICON_RED : ICON_GREEN);
    }
}

module.exports = Reporter;
