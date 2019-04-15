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
                column: parseInt(match[pattern.column], 10)
            };
        }
    }
    return null;
};

const parse_stack = sequence => {
    const lines = sequence.split('\n');
    return lines.map(line => parse_stack_line(line)).filter(x => x);
};

const filter_frames = (frames, drop) => {
    frames = frames.slice(Number(drop) || 0);
    let dropFrame = false;
    return frames.filter(frame => {
        dropFrame = dropFrame || RE_MARKER.test(frame.method);
        return !dropFrame;
    });
};

const format_frame = (frame, short) => {
    const loc = [short ? frame.basename : frame.url, frame.line, frame.column].filter(x => x).join(':');
    return frame.method ? `${frame.method} - ${loc}` : loc;
};

const format_frames = (frames, short) => {
    return frames.map(frame => format_frame(frame, short)).join('\n');
};

const indent = (str, prefix) => {
    return prefix + str.replace(/\n/g, '\n' + prefix);
};

const Err = (...args) => {
    const inst = Object.assign(Object.create(Err.prototype), {
        name: 'Err',
        message: '[no message]',
        stack: new Error().stack,
        drop: 0
    }, ...args.map(arg => {
        if (typeof arg === 'string') {
            return {message: arg};
        }
        if (typeof arg === 'number') {
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
    inst.frames = parse_stack(inst.stack);
    inst.filteredFrames = filter_frames(inst.frames, inst.drop);
    return inst;
};

Err.prototype = Object.assign(Object.create(Error.prototype), {
    constructor: Err,

    format(prefix = '', short = true) {
        let str = `${this.name}: ${this.message}\n`;
        str += indent(format_frames(this.filteredFrames, short), '  at ');
        return indent(str, prefix);
    },

    toString() {
        return this.format();
    }
});

module.exports = Err;
