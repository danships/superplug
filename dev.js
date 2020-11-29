const { SuperPlug } = require('./dist/index.js')

const main = async () => {
  let plug = new SuperPlug({packageProperty: 'version', location: __dirname });

  const plugins = await plug.getPlugins();
  if (plugins[0] === undefined) {
    throw new Error('Its undefined!');
  }
  const plugin = await plugins[0].getPlugin();
  console.log(plugin);
};

main();
