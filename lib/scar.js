const Test = require('./test');
const Suite = require('./suite');
const reporter = require('./reporter');
const cli = require('./cli');

class Scar {
    constructor() {
        this.tests = [];
    }

    test(...args) {
        this.tests.push(new Test(...args));
    }

    skip(...args) {
        this.test(...args, {skip: true});
    }

    sync(...args) {
        this.test(...args, {sync: true});
    }

    run(options) {
        options = {reporter, ...options};
        return new Suite(this.tests, options).run();
    }

    cli(options) {
        if (global.window) {
            return new Promise(resolve => {
                global.window.addEventListener('load', () => resolve());
            }).then(() => cli(this, options));
        }
        return cli(this, options);
    }

    static() {
        return Object.assign(this.test.bind(this), {
            scar: this,
            skip: this.skip.bind(this),
            sync: this.sync.bind(this),
            run: this.run.bind(this),
            cli: this.cli.bind(this)
        });
    }
}

module.exports = Scar;
