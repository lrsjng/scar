const Logger = require('./logger');

const Reporter = module.exports = () => {
    const inst = Object.assign(Object.create(Reporter.prototype), {
        testsTotal: 0,
        testsDone: 0,
        padlen: 0,
        logger: Logger(),
        callback: (...args) => inst.handle(...args)
    });
    return inst;
};

Reporter.prototype = {
    constructor: Reporter,

    handle(type, obj) {
        if (['beforeAll', 'afterTest', 'afterAll'].indexOf(type) >= 0) {
            this[type](obj);
        }
    },

    pad(x) {
        return ('        ' + x).substr(-this.padlen);
    },

    beforeAll(obj) {
        this.testsTotal = obj.runners.length;
        this.testsDone = 0;
        this.padlen = String(this.testsTotal).length;
        this.logger.log(' ');
        this.logger.icon('GREY');
        this.logger.title(`${this.pad(this.testsDone)} / ${this.testsTotal}`);
    },

    afterTest(obj) {
        this.testsDone += 1;
        const icon = obj.skipped() ? 's' : obj.failed() ? 'F' : ' ';
        const err = obj.err ? `>>>  ${String(obj.err)}` : '';
        const logfn = obj.skipped() ? this.logger.skipped : obj.failed() ? this.logger.failed : this.logger.passed;
        logfn(`  ${icon}  ${this.pad(this.testsDone)}/${this.testsTotal}  ${obj.desc}  (${obj.duration}ms)  ${err}`);
        if (err) {
            this.logger.icon('RED');
        }
        this.logger.title(`${this.pad(this.testsDone)} / ${this.testsTotal}`);
    },

    afterAll(obj) {
        let passed = 0;
        let failed = 0;
        let skipped = 0;
        obj.runners.forEach(ctx => {
            if (ctx.passed()) {
                passed += 1;
            } else if (ctx.skipped()) {
                skipped += 1;
            } else {
                failed += 1;
            }
        });
        this.logger.log(' ');
        const str = `  ${passed} - ${failed} - ${skipped}  (${obj.duration}ms)`;
        const logfn = failed ? this.logger.failed : this.logger.passed;
        logfn(str);
        this.logger.log(' ');
        if (!failed) {
            this.logger.icon('GREEN');
        }
        this.logger.title(str);
    }
};
