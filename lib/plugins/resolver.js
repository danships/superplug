const Promise = require('bluebird')
const Plugin = require('./plugin')
const packageReader = require('../package/reader')
const path = require('path')

function resolver (dependencies, options) {
  return Promise.map(dependencies, function (value) {
    return packageReader(path.join(options.location, 'node_modules', value, 'package.json'))
      .then(function (data) {
        if (data[options.packageProperty]) {
          let pluginData = data[options.packageProperty]
          return new Plugin(pluginData.name, path.join(options.location, 'node_modules', value), pluginData, data)
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
