const {test} = require('../../lib');

require('./lib');
require('./err');
require('./suite');
require('./test');
require('./util');
require('./static-interface');

require('./builtin/assert');
require('./builtin/insp');
require('./builtin/spy');
require('./builtin/uniq');

test.cli({sync: true});
