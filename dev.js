const SuperPlug = require('./index.js')

let plug = new SuperPlug({packageProperty: 'version'})

plug.getPlugins()
  .then(function (data) {
    console.log(data[0].name)
    data[0].getPlugin().then((plugin) => { console.log(plugin) })
  })
