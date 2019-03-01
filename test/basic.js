const path = require('path')
const { exec } = require('child_process')
const tap = require('tap')

const lib = require('../lib')

const _repo = path.join(__dirname, './sample/repo')

function execAsync (command) {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

tap.test('strict a repo',
  async (_test) => {
    _test.plan(1)
    await execAsync(`rm -rf ${_repo}; git clone https://github.com/braceslab/json-stringify-extended ${_repo}`)
    const _report = await lib.run(_repo)

    _test.ok(_report.skipped.length === 0 && _report.done.length === 3)
  })

tap.test('strict a repo again',
  async (_test) => {
    _test.plan(1)

    const _report = await lib.run(_repo)
    _test.ok(_report.skipped.length === 3 && _report.done.length === 0)
  })
