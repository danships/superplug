import path from 'path';
import { Options } from './types';
import packageReader from './package/reader';
import pluginResolver from './plugins/resolver';
import Plugin from './plugins/plugin';

export { Package } from './package/types';
export {
  Options,
  Plugin
}

export class SuperPlug {
  constructor(private options: Options) {
    this.options.packageProperty = this.options.packageProperty || 'superPlug';
  }

  public async getPlugins() {
    const result = await packageReader(path.join(this.options.location, 'package.json'));
    if (!result.dependencies) {
      return [];
    }
    return await pluginResolver(result.dependencies, this.options);
  }
}
