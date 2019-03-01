#!/usr/env node

'use strict'

const lib = require('../lib')

;(async () => {
  const _report = await lib.files(__dirname)
  lib.log.info('skipped', _report.skipped.length, 'files')
  lib.log.info(_report.skipped)
  lib.log.info('\n---\n')
  lib.log.info('stricted', _report.done.length, 'files')
  lib.log.info(_report.done)
})()
