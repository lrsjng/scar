const Test = require('./test');
const Suite = require('./suite');
const Reporter = require('./reporter');
const Cli = require('./cli');

const Scar = module.exports = () => {
    return Object.assign(Object.create(Scar.prototype), {
        tests: []
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

    run(options) {
        options = Object.assign({
            reporter: Reporter().callback
        }, options);
        return Suite(this.tests, options).run();
    },

    cli(options) {
        return Cli().run(this, options);
    },

    static() {
        return Object.assign(this.test.bind(this), {
            scar: this,
            skip: this.skip.bind(this),
            sync: this.sync.bind(this),
            run: this.run.bind(this),
            cli: this.cli.bind(this)
        });
    }
};
