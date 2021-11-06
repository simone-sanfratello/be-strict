#!/usr/bin/env node

'use strict'

const yargs = require('yargs/yargs')
const lib = require('../lib')

const { hideBin } = require('yargs/helpers')
const argv =
yargs(hideBin(process.argv))
  .option('ignore', {
    alias: 'i',
    type: 'string',
    description: 'ignore dirs, default is .git and node_modules',
    default: '.git,node_modules'
  })
  .option('path', {
    alias: 'p',
    type: 'string',
    description: 'repo path to apply strictness - default cwd'
  })
  .argv

;(async () => {
  const _report = await lib.run(argv.path || process.cwd(), argv.ignore ? argv.ignore.split(',') : undefined)
  lib.log.info('\n---\n')
  lib.log.info('skipped', _report.skipped.length, 'files - already stricted')
  lib.log.info(_report.skipped)
  lib.log.info('\n---\n')
  lib.log.info('stricted', _report.done.length, 'files')
  lib.log.info(_report.done)
  lib.log.info('\n---\n')

  lib.log.info('\n     well done! this project is \'strict\'!\n\n')
})()
