import path from 'node:path';
import { SuperPlug } from '../..';

function getSuperPlug(): SuperPlug {
  return new SuperPlug({
    location: path.join(__dirname, '../data'),
    requirePackageMain: false,
  });
}

describe('Test finding plugins that do not necessary have a main property.', () => {
  test('Use the default superPlug property', async () => {
    const superPlug = getSuperPlug();

    const plugins = await superPlug.getPlugins();
    expect(plugins).toHaveLength(2); // data/package-plugin-superplug and data/package-plugin-superplug-no-main

    expect(plugins.find((plugin) => plugin.rawPackage.name === 'superplug-plugin')).toBeDefined();

    const pluginWithoutMain = plugins.find((plugin) => plugin.rawPackage.name === 'superplug-plugin-no-main');
    if (!pluginWithoutMain) {
      throw new TypeError('pluginWithoutMain not found in list of plugins.');
    }

    // Verify that the location is set, even though there was no main property configured.
    expect(pluginWithoutMain.location).toContain('/tests/data/node_modules/package-plugin-superplug-no-main');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(() => pluginWithoutMain.getPlugin()).rejects.toThrowError();
  });
});
