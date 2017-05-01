
class Plugin {
  constructor (name, location, rawProperty, rawPackage) {
    this.name = name
    this.location = location
    this.rawProperty = rawProperty
    this.rawPackage = rawPackage
  }

  getName () {
    return this.name
  }

  getModuleName () {
    return this.rawPackage.name
  }

  getRawProperty () {
    return this.rawProperty
  }

  getPlugin () {
    return new Promise((resolve, reject) => {
      resolve(require(this.rawPackage.name))
    })
  }
}

module.exports = Plugin
