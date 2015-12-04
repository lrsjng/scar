const HAS_COLOR = (() => {
    const proc = global.process;

    if (proc && proc.stdout && proc.stdout.isTTY) {
        if ('COLORTERM' in proc.env) {
            return true;
        }
        if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(proc.env.TERM)) {
            return true;
        }
        if (proc.platform === 'win32') {
            return true;
        }
    }

    return false;
})();

const esc = (...codes) => `\u001b[${codes.join(';') || 0}m`;
const wrap = (...codes) => HAS_COLOR ? x => esc(...codes) + x + esc() : x => x;

module.exports = {
    red: wrap(1, 31),
    green: wrap(32),
    yellow: wrap(33)
};
