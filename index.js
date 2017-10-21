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
    // Read the package.json for dependencies
    return packageReader(path.join(this.options.location, 'package.json'))
      .then((result) => {
        if (!result.dependencies) {
          return []
        }
        return pluginResolver(Object.keys(result.dependencies), this.options)
      })
  }
}

module.exports = SuperPlug
