const scar = require('./scar');

module.exports = {
    scar,
    test: scar(),
    assert: require('./builtin/assert'),
    insp: require('./builtin/insp'),
    spy: require('./builtin/spy'),
    uniq: require('./builtin/uniq')
};
