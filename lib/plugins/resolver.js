const Promise = require('bluebird')
const Plugin = require('./plugin')
const packageReader = require('../package/reader')

function resolver (dependencies, options) {
  return Promise.map(dependencies, function (value) {
    return packageReader('./node_modules/' + value + '/package.json')
      .then(function (data) {
        if (data[options.packageProperty]) {
          return new Plugin(data.name, './node_modules/' + value, data[options.packageProperty], data)
        }
        return null
      })
  }).then(function (plugins) {
    return plugins.filter(function (value) {
      return value !== null
    })
  })
}

module.exports = resolver
