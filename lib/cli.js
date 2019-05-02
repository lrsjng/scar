const Err = require('./err');

const HELP = `
  scar - a test runner for node and the browser

  Usage:
    node tests.js [opt...] [arg...]
    tests.html?opt&...&arg&...

  Options:
    -h: show this help message
    -s: show test stats

  Arguments:
    all arguments are used as test filters

`;

const log = console.log.bind(console);

const create_filter_fn = filters => {
    if (!filters || !filters.length) {
        return null;
    }
    return test => filters.every(filter => test.desc.includes(filter));
};

const parse_args = () => {
    let args = [];
    if (global.process) {
        args = global.process.argv.slice(2);
    } else if (global.window) {
        args = global.window.location.href.split(/[\?&]+/).slice(1);
    }

    return {
        show_help: args.includes('-h'),
        show_stats: args.includes('-s'),
        filters: args.filter(arg => arg.length && arg[0] !== '-')
    };
};

const cli = (scar, options) => {
    return Promise.resolve().then(() => {
        const cli_opts = parse_args();

        if (cli_opts.show_help) {
            log(HELP);
        } else if (cli_opts.show_stats) {
            log(`\n  ${scar.tests.length} tests defined\n \n`);
        } else {
            options = {
                ...options,
                filter: create_filter_fn(cli_opts.filters)
            };
            return scar.run(options)
                .then(suite => {
                    if (global.process && suite.failed_count) {
                        global.process.exit(1);
                    }
                })
                .catch(err => {
                    log(`\n${new Err(err).format('  ')}\n`);
                    if (global.process) {
                        global.process.exit(2);
                    }
                });
        }
        return null;
    });
};

module.exports = cli;
