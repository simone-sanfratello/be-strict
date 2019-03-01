#!/usr/bin/env node

'use strict'

const program = require('commander')
const lib = require('../lib')

program
  .option('-i, --ignore [.git,node_modules]', 'ignore dirs, default is .git and node_modules')
  .parse(process.argv)

;(async () => {
  const _report = await lib.run(process.cwd(), program.ignore ? program.ignore.split(',') : undefined)
  lib.log.info('\n---\n')
  lib.log.info('skipped', _report.skipped.length, 'files - already stricted')
  lib.log.info(_report.skipped)
  lib.log.info('\n---\n')
  lib.log.info('stricted', _report.done.length, 'files')
  lib.log.info(_report.done)
  lib.log.info('\n---\n')

  lib.log.info('\n     well done! this project \'use strict\' a lot!\n\n')
})()
