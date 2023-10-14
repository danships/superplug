import { NoPluginMainDefinedError } from '../exception';
import type { Package } from '../package/types';

class Plugin {
  constructor(
    public name: string,
    public location: string | undefined,
    public rawProperty: unknown,
    public rawPackage: Package
  ) {}

  public async getPlugin() {
    if (!this.location) {
      // This is a plugin without a 'main' attribute in the package.json.
      throw new NoPluginMainDefinedError(`No main defined for plugin ${this.name}.`);
    }
    return await import(this.location);
  }
}

export default Plugin;
