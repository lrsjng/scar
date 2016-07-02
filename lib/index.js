const Scar = require('./scar');

module.exports = {
    Scar,
    test: Scar().static(),
    assert: require('./assert'),
    insp: require('./insp'),
    spy: require('./spy'),
    uniq: require('./uniq')
};
