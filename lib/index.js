const Scar = require('./scar');

module.exports = {
    Scar,
    test: new Scar().static(),
    assert: require('./builtin/assert'),
    insp: require('./builtin/insp'),
    spy: require('./builtin/spy'),
    uniq: require('./builtin/uniq')
};
