# be-strict

[![NPM Version](http://img.shields.io/npm/v/be-strict.svg?style=flat)](https://www.npmjs.org/package/be-strict)
[![NPM Downloads](https://img.shields.io/npm/dm/be-strict.svg?style=flat)](https://www.npmjs.org/package/be-strict)
[![JS Standard Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

be strict: add 'use strict' on the top of js files if missing

## Installing

````bash
npm i -g be-strict
````

### Quick start

```bash
$ cd /my-project
$ be-strict
```

```
skipped 3 files
[
  '/home/simone/dev/my-project/example/basic.js',
  '/home/simone/dev/my-project/lib/utils.js',
  '/home/simone/dev/my-project/settings/env.js'
]

---

stricted 4 files
[ '/home/simone/dev/my-project/main.js',
  '/home/simone/dev/my-project/example/app.js',
  '/home/simone/dev/my-project/example/settings/production.js'
]

     well done! this project is 'strict'!
```

### Options

```bash
$ be-strict --help

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -i, --ignore   ignore dirs, default is .git and node_modules
                                         [string] [default: ".git,node_modules"]
  -p, --path     repo path to apply strictness - default cwd            [string]
```

---

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
