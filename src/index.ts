import path from 'node:path';
import packageReader from './package/reader';

import pluginResolver from './plugins/resolver';
import type { Options } from './types';

export { Package } from './package/types';

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

export { Options } from './types';
export { default as Plugin } from './plugins/plugin';
