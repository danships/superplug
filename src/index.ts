import path from 'node:path';
import packageReader from './package/reader';

import pluginResolver from './plugins/resolver';
import type { InternalOptions, Options } from './types';

export { Package } from './package/types';

export class SuperPlug {
  private options: InternalOptions;

  constructor(options: Options) {
    this.options = {
      requirePackageMain: true,
      packageProperty: 'superPlug',
      ...options,
    };
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
export { NoPluginMainDefinedError } from './exception';
