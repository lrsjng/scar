const {Test, TestsRunner} = require('./runner');
const Reporter = require('./reporter');

const Scar = module.exports = () => {
    return Object.assign(Object.create(Scar.prototype), {
        tests: [],
        reporter: Reporter().callback
    });
};

Scar.prototype = {
    constructor: Scar,

    test(...args) {
        this.tests.push(Test(...args));
    },

    skip(...args) {
        this.test(...args, {skip: true});
    },

    sync(...args) {
        this.test(...args, {sync: true});
    },

    run() {
        return TestsRunner(this.tests).run(this.reporter);
    },

    static() {
        return Object.assign(this.test.bind(this), {
            scar: this,
            skip: this.skip.bind(this),
            sync: this.sync.bind(this),
            run: this.run.bind(this)
        });
    }
};
