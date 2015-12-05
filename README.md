# scar

[![license][license-img]][github] [![web][web-img]][web] [![github][github-img]][github] [![npm][npm-img]][npm]  
[![version][npm-v-img]][npm] [![downloads][npm-dm-img]][npm] [![dependencies status][gemnasium-img]][gemnasium] [![build status][travis-img]][travis]

A test runner for Node.js and the browser. Extensively tested with mocha and itself, 1000+ tests each.


## Install

~~~sh
> npm install [-D] scar
~~~


## Examples

node/webpack/browserify

~~~js
const {test, assert} = require('scar');

test('passing', () => {
    assert.equal(1, 1);
});

test('failing', () => {
    assert.equal(1, 2);
});

test.cli();
~~~


pure browser

~~~html
<!-- optional polyfills for older browsers -->
<script src="scar.js"></script>
<script>
    var test = window.scar.test;
    var assert = window.scar.assert;

    test('passing', () => {
        assert.equal(1, 1);
    });

    test('failing', () => {
        assert.equal(1, 2);
    });

    test.cli();
</script>
~~~


## CLI

~~~
scar - a test runner for node and the browser

Usage:
  node your-script.js [opt...] [arg...]
  your-url.html?opt&...&arg&...

Options:
  -h: show this help message
  -t: show test stats

Arguments:
  all arguments are used as test filters
~~~


## API

### scar
~~~js
const obj = require('scar') // nodejs
var obj = window.scar // browser
~~~

then `obj` is

~~~js
{
    Scar, // constructor
    test, // preconstructed Scar().static()
    assert, // lightweight assertions
    insp // lightweight value inspection
}
~~~

### test
~~~js
test(desc, fn, {skip, sync}) // args optional and in any order
test.skip(desc, fn, {sync}) // implies `skip: true`
test.sync(desc, fn, {skip}) // implies `sync: true`
test.run() // run all tests with default reporter => Promise()
test.cli() // run CLI with default reporter => Promise()
test.scar // scar instance
~~~

### assert
~~~js
assert(expr, msg) // !!expr === true
assert.fail(msg)
assert.ok(act, msg) // !!act === true
assert.notOk(act, msg) // !act === true
assert.equal(act, exp, msg) // act === exp
assert.notEqual(act, ref, msg) // act !== ref
assert.throws(fn, exp, msg)
~~~

### insp
~~~js
insp(x) // => string repr of x
~~~


## License
The MIT License (MIT)

Copyright (c) 2015 Lars Jung (https://larsjung.de)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


[web]: https://larsjung.de/scar/
[github]: https://github.com/lrsjng/scar
[npm]: https://www.npmjs.org/package/scar
[gemnasium]: https://gemnasium.com/lrsjng/scar
[travis]: https://travis-ci.org/lrsjng/scar

[license-img]: https://img.shields.io/badge/license-MIT-a0a060.svg?style=flat-square
[web-img]: https://img.shields.io/badge/web-larsjung.de/scar-a0a060.svg?style=flat-square
[github-img]: https://img.shields.io/badge/github-lrsjng/scar-a0a060.svg?style=flat-square
[npm-img]: https://img.shields.io/badge/npm-scar-a0a060.svg?style=flat-square

[npm-v-img]: https://img.shields.io/npm/v/scar.svg?style=flat-square
[npm-dm-img]: https://img.shields.io/npm/dm/scar.svg?style=flat-square
[gemnasium-img]: https://img.shields.io/gemnasium/lrsjng/scar.svg?style=flat-square
[travis-img]: https://img.shields.io/travis/lrsjng/scar.svg?style=flat-square
