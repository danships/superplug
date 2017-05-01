const assert = require('assert')
const reader = require('../../../../lib/package/reader')
const packageJson = require('../../../../package.json')

describe('package/reader', function () {
  describe('Promise result', function () {
    it('should match the package.json', function () {
       return reader('./package.json')
        .then(function (data) {
          assert.equal(packageJson.name, data.name)
          assert.equal(packageJson.version, data.version)
        })
    })
  })
})
