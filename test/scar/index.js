const {test} = require('../../lib');

require('./lib');
require('./assert');
require('./insp');
require('./test');
require('./testrunner');
require('./testsrunner');
require('./util');
require('./static-interface');

test.run();
