const format_err = require('./err');
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

const reporter = (type, suite, test) => {
    if (type === 'before_all') {
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

    if (type === 'after_test') {
        const status = test.status === Test.PASSED ? ' ok ' : test.status === Test.SKIPPED ? 'skip' : 'FAIL';
        log(` ${status} ${test.desc}`);
    }

    if (type === 'after_all') {
        suite.tests.filter(t => t.status === Test.FAILED).forEach(t => {
            const str = format_err(t.err, '  ');
            log(`\n[${t.failed_idx}] ${t.desc}\n${str}`);
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

    return null;
};

module.exports = reporter;
