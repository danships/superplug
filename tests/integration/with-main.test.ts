import path from 'node:path';
import { type Options, SuperPlug } from '../..';

function getSuperPlug(options: Partial<Options> = {}): SuperPlug {
  return new SuperPlug({
    ...options,
    location: path.join(__dirname, '../data'),
  });
}

describe('Test finding plugins that have a main definition', () => {
  test('Use the default superPlug property', async () => {
    const superPlug = getSuperPlug();

    const plugins = await superPlug.getPlugins();

    expect(plugins).toHaveLength(1); // only data/package-plugin-superplug

    const plugin = plugins[0];
    if (!plugin) {
      throw new TypeError('Plugin should be defined.');
    }

    expect(plugin.name).toBe('Superplug plugin');
    expect(plugin.rawPackage.name).toBe('superplug-plugin');

    const pluginFunction = await plugin.getPlugin();
    expect(pluginFunction.default()).toBe('plugin-superplug');
  });

  test('Use a custom property', async () => {
    const superPlug = getSuperPlug({ packageProperty: 'testplugin' });

    const plugins = await superPlug.getPlugins();

    const plugin = plugins[0];
    if (!plugin) {
      throw new TypeError('Plugin should be defined.');
    }

    expect(plugins).toHaveLength(1); // only data/package-plugin-testplugin
    expect(plugin.name).toBe('Test plugin');
    expect(plugin.rawPackage?.name).toBe('test-plugin');

    const pluginFunction = await plugin.getPlugin();
    expect(pluginFunction.default()).toBe('plugin-test');
  });
});
