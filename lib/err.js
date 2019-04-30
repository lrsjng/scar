const {is_str, is_num} = require('./util');

const LINE_PATTERNS = [
    { // v8: ' at <method> (<url>:<line>:<col>)'
        re: /^\s*at\s+(.*?)\s+\((.*?)(?::(\d+))?(?::(\d+))?\)\s*$/,
        method: 1,
        url: 2,
        line: 3,
        column: 4
    },
    { // v8 no method: ' at <url>:<line>:<col>'
        re: /^\s*at\s+(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
        method: null,
        url: 1,
        line: 2,
        column: 3
    },
    { // spidermonkey: '<method>@<url>:<line>:<col>'
        re: /^(.*?)@(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
        method: 1,
        url: 2,
        line: 3,
        column: 4
    }
];
const RE_MARKER = /__TRACE_MARKER__$|^process\._tickCallback$/;

const parse_stack_line = line => {
    for (const pattern of LINE_PATTERNS) {
        const match = pattern.re.exec(line);
        if (match) {
            return {
                method: match[pattern.method] || '',
                url: match[pattern.url],
                basename: match[pattern.url].replace(/^.*\//, ''),
                line: parseInt(match[pattern.line], 10),
                column: parseInt(match[pattern.column], 10),
                drop: false
            };
        }
    }
    return null;
};

const parse_stack = (sequence, drop) => {
    drop = Number(drop) || 0;
    const lines = sequence.split('\n');
    const frames = lines.map(line => parse_stack_line(line)).filter(x => x);
    let drop_frames = false;
    frames.forEach((frame, idx) => {
        drop_frames = drop_frames || RE_MARKER.test(frame.method);
        frame.drop = idx < drop || drop_frames;
    });
    return frames;
};

const format_frame = (frame, short) => {
    const loc = [short ? frame.basename : frame.url, frame.line].filter(x => x).join('  ');
    return frame.method ? `${loc}  (${frame.method})` : loc;
};

const format_frames = (frames, short) => {
    return frames.map(frame => format_frame(frame, short)).join('\n');
};

const indent = (str, prefix) => {
    return prefix + str.replace(/\n/g, '\n' + prefix);
};

class Err extends Error {
    constructor(...args) {
        super();
        Object.assign(this, {
            name: 'Err',
            message: '[no message]',
            drop: 0
        }, ...args.map(arg => {
            if (is_str(arg)) {
                return {message: arg};
            }
            if (is_num(arg)) {
                return {drop: arg};
            }
            if (arg) {
                const obj = {error: arg};
                for (const prop of ['name', 'message', 'stack', 'drop', ...Object.keys(arg)]) {
                    if (arg[prop] !== undefined) {
                        obj[prop] = arg[prop];
                    }
                }
                return obj;
            }
            return null;
        }));
        this.frames = parse_stack(this.stack, this.drop);
    }

    format(prefix = '', short = true, full_stack = false) {
        let str = `${this.name}: ${this.message}\n`;
        str += indent(format_frames(this.frames.filter(frame => full_stack || !frame.drop), short), '->  ');
        return indent(str, prefix);
    }

    toString() {
        return this.format();
    }
}

module.exports = Err;
