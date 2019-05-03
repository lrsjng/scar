const LINE_PATTERNS = [
    { // v8: ' at <method> (<url>:<line>:<col>)'
        re: /^\s*at\s+(.*?)\s+\((.*?)(?::(\d+))?(?::(\d+))?\)\s*$/,
        method: 1, url: 2, line: 3, column: 4
    },
    { // v8 no method: ' at <url>:<line>:<col>'
        re: /^\s*at\s+(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
        method: null, url: 1, line: 2, column: 3
    },
    { // spidermonkey: '<method>@<url>:<line>:<col>'
        re: /^(.*?)@(.*?)(?::(\d+))?(?::(\d+))?\s*$/,
        method: 1, url: 2, line: 3, column: 4
    }
];
const RE_MARKER = /__TRACE_MARKER__$|^process\._tickCallback$/;

const parse_frame = line => {
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

const parse_frames = (sequence, drop) => {
    drop = Number(drop) || 0;
    const lines = sequence.split('\n');
    const frames = lines.map(line => parse_frame(line)).filter(x => x);
    let drop_frames = false;
    frames.forEach((frame, idx) => {
        drop_frames = drop_frames || RE_MARKER.test(frame.method);
        frame.drop = idx < drop || drop_frames;
    });
    return frames;
};

const format_frames = (frames, short) => {
    return frames.map(frame => {
        const loc = [short ? frame.basename : frame.url, frame.line, frame.column].filter(x => x).join('  ');
        return frame.method ? `${loc}  (${frame.method})` : loc;
    }).join('\n');
};

const indent = (str, prefix) => {
    return prefix + str.replace(/\n/g, '\n' + prefix);
};

const format_err = (err, prefix = '', short = false, full_stack = false) => {
    const frames = parse_frames(err.stack, err.drop);
    let str = `${err.name}: ${err.message}\n`;
    str += indent(format_frames(frames.filter(frame => full_stack || !frame.drop), short), '->  ');
    return indent(str, prefix);
};

module.exports = format_err;
