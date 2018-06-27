'use strict'
let HOST = process.argv.splice(2)[0] || 'api'
module.exports = {
  NODE_ENV: '"production"',
  API_HOST: '"'+HOST+'"'
}
