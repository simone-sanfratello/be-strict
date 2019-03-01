'use strict'

const path = require('path')
const fs = require('fs').promises
const default_ = require('./default')

const BUFFER_SIZE = 64

const lib = {
  log: {
    info: function (...args) {
      console.log(...args)
    },
    error: function (...args) {
      console.error(...args)
    }
  },
  files: async function (path_, base = '', ignore = default_.ignore) {
    lib.log.info('reading', path_, '...')
    const _files = await fs.readdir(path_)
    lib.log.info(' ... found', _files.length, 'files in', path_)
    const _tasks = []
    let done = []
    let skipped = []
    for (const _file of _files) {
      _tasks.push((async () => {
        const _current = path.join(path_, _file)
        const _stat = await fs.lstat(_current)
        const _extension = path.extname(_file)
        if (_stat.isFile() && _extension === '.js') {
          lib.log.info(' >>> acquired js file', _current.substr(base.length + 1))
          const _stricted = await lib.strict(_current)
          _stricted
            ? done.push(_current)
            : skipped.push(_current)
        } else if (_stat.isDirectory()) {
          if (ignore.find((ignore) => _current.endsWith(ignore))) {
            lib.log.info(' --- ignore dir', _current.substr(path_.length + 1))
          } else {
            const _report = await lib.files(_current, path_, ignore)
            done = done.concat(_report.done)
            skipped = skipped.concat(_report.skipped)
          }
        }
      })())
    }
    await Promise.all(_tasks)
    return { done, skipped }
  },
  /**
   * read first line in file lookng for 'use strict' declaration
   * 'use strict' will be added on top if missing
   * @param {string} file full path
   * @reutrn {bool} true if added 'use strict', false if already has
   */
  strict: async function (file) {
    let _handle
    try {
      _handle = await fs.open(file, 'r+')
      const _buffer = Buffer.alloc(BUFFER_SIZE)
      let _chunk
      let _line = ''
      let _offset = 0
      do {
        await _handle.read(_buffer, 0, BUFFER_SIZE, _offset)
        _chunk = _buffer.toString('utf8')
        _line += _chunk
        _offset += BUFFER_SIZE
      } while (!_chunk.includes('\n'))
      if (_line.includes('use strict')) {
        return false
      }
      const _content = await _handle.readFile('utf8')
      await _handle.write("'use strict'\n\n" + _content, 0, 'utf8')
      return true
    } catch (error) {
      lib.log.error('ERROR', file, error)
    } finally {
      if (_handle) {
        await _handle.close()
      }
    }
    return false
  }
}

module.exports = lib
