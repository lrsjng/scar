const Err = require('./err');

const HELP = `

  scar - a test runner for node and the browser

  Usage:
    [node] your-script.js [opt...] [arg...]
    your-url.html?opt&...&arg&...

  Options:
    -h: show this help message
    -t: show test stats

  Arguments:
    all arguments are used as test filters

`;

const createFilterFn = filters => {
    if (!filters || !filters.length) {
        return null;
    }
    return test => filters.every(filter => test.desc.indexOf(filter) >= 0);
};

const Cli = module.exports = () => {
    return Object.assign(Object.create(Cli.prototype), {
        log: console.log.bind(console)
    });
};

Cli.prototype = {
    constructor: Cli,

    getArgs() {
        if (global.process) {
            return global.process.argv.slice(2);
        }

        if (global.window) {
            return global.window.location.href.split(/[\?&]+/).slice(1);
        }

        return [];
    },

    parseArgs(args = this.getArgs()) {
        return {
            showHelp: args.indexOf('-h') >= 0,
            showStats: args.indexOf('-s') >= 0,
            filters: args.filter(arg => arg.length > 0 && arg[0] !== '-')
        };
    },

    run(scar, options) {
        return Promise.resolve().then(() => {
            const cliopts = this.parseArgs();

            if (cliopts.showHelp) {
                this.log(HELP);
            } else if (cliopts.showStats) {
                this.log(`\n  ${scar.tests.length} tests defined\n \n`);
            } else {
                options = Object.assign({}, options, {
                    filter: createFilterFn(cliopts.filters)
                });
                return scar.run(options)
                    .then(suite => {
                        if (global.process && suite.failedCount) {
                            global.process.exit(1);
                        }
                    })
                    .catch(err => {
                        this.log(`\n${Err(err).format('  ')}\n`);
                        if (global.process) {
                            global.process.exit(2);
                        }
                    });
            }
        });
    }
};
