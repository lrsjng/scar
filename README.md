# scar

[![license][license-img]][github] [![github][github-img]][github] [![npm][npm-img]][npm]  

Test runner for Node.js and the browser, extensively tested with mocha and itself. Basic assertion functions are included, but it should work fine with any assertion lib that throws and rejects. Supports async tests through `Promise`. Lightweight object inspection, unique IDs and function spies included.


## Examples

Works fine with Node.js, Webpack+Babel and Browserify+Babel.

```js
const {test, assert} = require('scar');

test('passing', () =>; {
    assert.equal(1, 1);
});

test('failing', () =>; {
    assert.equal(1, 2);
});

test.cli();
```

Might need additional polyfills for `Promise`, `Object.assign` and `Array.prototype.every` to work in older browsers.

```html
<script src="scar.js"></script>
<script>
    var test = window.scar.test;
    var assert = window.scar.assert;

    test('passing', function () {
        assert.equal(1, 1);
    });

    test('failing', function () {
        assert.equal(1, 2);
    });

    test.cli();
</script>
```


## CLI

```
scar - a test runner for node and the browser

Usage:
  node your-script.js [opt...] [arg...]
  your-url.html?opt&...&arg&...

Options:
  -h: show this help message

Arguments:
  all arguments are used as test filters
```


## API

### scar
```js
const obj = require('scar')  // nodejs
var obj = window.scar        // browser
```

then `obj` is
```js
{
    scar,    // factory
    test,    // preconstructed scar()
    assert,  // lightweight assertions
    insp,    // lightweight value inspection
    uniq,    // unique IDs and objects
    spy      // lightweight function spies
}
```

### test
```js
test(desc, fn, {skip, sync})  // args optional and in any order
test.skip(desc, fn, {sync})   // like {skip: true}
test.sync(desc, fn, {skip})   // like {sync: true}
test.run()                    // run all tests => Promise()
test.cli()                    // run CLI => Promise()
```

### assert
```js
assert(expr, msg)                     // !!expr === true
assert.fail(msg)
assert.ok(act, msg)                   // !!act === true
assert.not_ok(act, msg)               // !act === true
assert.equal(act, exp, msg)           // act === exp
assert.not_equal(act, ref, msg)       // act !== ref
assert.deep_equal(act, exp, msg)      // act === exp for all but Array and plain Object
assert.not_deep_equal(act, ref, msg)  // !deep_equal()
assert.throws(fn, exp, msg)
assert.rejects(thenable, exp, msg)    // => Promise
```

### insp
```js
insp(x)  // => string repr of x
```

### uniq
```js
uniq.id()       // => 'UNIQ-0007-ID'
uniq.is_id(x)   // => x matches 'UNIQ-xxxx-ID'
uniq.obj()      // => {_uniq_id: 'UNIQ-0013-ID'}
uniq.path(ext)  // => '_uniq_path/UNIQ-0021-ID.ext'
```

### spy
```js
spy([fn])  // => spy function, with optional call handler 'fn(call, calls)'
```

Example usage:

```js
const a_spy_fn = spy(() => 42);
a_spy_fn.calls        // => []
a_spy_fn(11, 22, 33)  // => 42
a_spy_fn.calls[0]     // => {idx: 0, ctx: undefined, args: [11, 22, 33], ret: 42, time: ..., done: ...}
```


## License
The MIT License (MIT)

Copyright (c) 2024 Lars Jung (https://larsjung.de)

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


[github]: https://github.com/lrsjng/scar
[npm]: https://www.npmjs.org/package/scar

[license-img]: https://img.shields.io/badge/license-MIT-a0a060.svg?style=flat-square
[github-img]: https://img.shields.io/badge/github-lrsjng/scar-a0a060.svg?style=flat-square
[npm-img]: https://img.shields.io/badge/npm-scar-a0a060.svg?style=flat-square
