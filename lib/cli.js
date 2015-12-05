const getArgs = () => {
    if (global.process) {
        return global.process.argv.slice(2);
    }

    if (global.window) {
        return global.window.location.href.split(/[\?&]+/).slice(1);
    }

    return [];
};

const parseArgs = (args = getArgs()) => {
    return {
        showHelp: args.indexOf('-h') >= 0,
        showStats: args.indexOf('-s') >= 0,
        filters: args.filter(arg => arg.length > 0 && arg[0] !== '-')
    };
};

module.exports = (scar, options = {}) => {
    return Promise.resolve().then(() => {
        const cliopts = parseArgs();

        if (cliopts.showHelp) {
            let str = '';
            str += `  \n`;
            str += `  scar - a test runner for node and the browser\n`;
            str += `  \n`;
            str += `  Usage:\n`;
            str += `    [node] your-script.js [opt...] [arg...]\n`;
            str += `    your-url.html?opt&...&arg&...\n`;
            str += `  \n`;
            str += `  Options:\n`;
            str += `    -h: show this help message\n`;
            str += `    -t: show test stats\n`;
            str += `  \n`;
            str += `  Arguments:\n`;
            str += `    all arguments are used as test filters\n`;
            str += `  \n`;
            console.log(str);
        } else if (cliopts.showStats) {
            let str = '';
            str += `  \n`;
            str += `  ${scar.tests.length} tests defined`;
            str += `  (${scar.tests.filter(test => test.skip).length} with skip)\n`;
            str += `  \n`;
            console.log(str);
        } else {
            if (cliopts.filters.length) {
                options.filters = cliopts.filters;
            }
            return scar.run(options);
        }
    });
};
