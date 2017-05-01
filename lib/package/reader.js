const Promise = require('bluebird')
const readJsonPromisified = Promise.promisify(require('read-package-json'))

function read (packageJson) {
  return readJsonPromisified(packageJson, console.error, false)
}

module.exports = read
