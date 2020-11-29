import { Package } from "../package/types"

class Plugin {
  constructor (
    public name: string,
    public location: string,
    public rawProperty: any,
    public rawPackage: Package
  ) {}

  async getPlugin() {
    return await import(this.location);
  }
}

export default Plugin;
