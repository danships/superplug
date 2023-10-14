import type { Package } from '../package/types';

class Plugin {
  constructor(
    public name: string,
    public location: string,
    public rawProperty: unknown,
    public rawPackage: Package
  ) {}

  public async getPlugin() {
    return await import(this.location);
  }
}

export default Plugin;
