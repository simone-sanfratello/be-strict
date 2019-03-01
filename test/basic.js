const path = require('path')
const lib = require('../lib')

;(async () => {
  console.log(await lib.files(path.join(__dirname, './sample/a-toolbox')))
})()
