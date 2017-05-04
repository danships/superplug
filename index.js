const path = require('path')
const packageReader = require('./lib/package/reader')
const pluginResolver = require('./lib/plugins/resolver')

class SuperPlug {
  constructor (options) {
    this.options = {
      location: options.location,
      packageProperty: options.packageProperty || 'superplug'
    }
  }

  getPlugins () {
    return packageReader(path.join(this.options.location, 'package.json'))
      .then((result) => {
        return pluginResolver(Object.keys(result.dependencies), this.options)
      })
  }
}

module.exports = SuperPlug
