const PROC = global.process;
const WIN = global.window;
const HELP = `scar - a test runner for node and the browser

Usage:
  node tests.js [opt...] [arg...]
  tests.html?opt&...&arg&...

Options:
  -h: show this help message

Arguments:
  all arguments are used as test filters
`;

const log = console.log.bind(console);

const create_filter_fn = strs => test => strs.every(s => test.desc.includes(s));

const parse_args = () => {
    let args = [];
    if (PROC) {
        args = PROC.argv.slice(2);
    } else if (WIN) {
        args = WIN.location.href.split(/[\?&]+/).slice(1);
    }

    return {
        show_help: args.includes('-h'),
        filters: args.filter(arg => arg.length && arg[0] !== '-')
    };
};

const cli = (run, options) => {
    return Promise.resolve()
        .then(() => {
            return !WIN ? null : new Promise(resolve => {
                WIN.addEventListener('load', () => resolve());
            });
        })
        .then(() => {
            const cli_opts = parse_args();

            if (cli_opts.show_help) {
                log(HELP);
                return null;
            }

            options = {
                ...options,
                filter: create_filter_fn(cli_opts.filters)
            };
            return run(options)
                .then(suite => {
                    if (PROC && suite.failed_count) {
                        PROC.exit(1);
                    }
                })
                .catch(err => {
                    log(`\n${err.stack}\n`);
                    if (PROC) {
                        PROC.exit(2);
                    }
                });
        });
};

module.exports = cli;
