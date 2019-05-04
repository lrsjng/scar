const {test} = require('../../lib');

require('./lib');
require('./err');
require('./suite');
require('./test');
require('./util');
require('./scar');

require('./builtin/assert');
require('./builtin/insp');
require('./builtin/spy');
require('./builtin/uniq');

test.cli({sync: true});
