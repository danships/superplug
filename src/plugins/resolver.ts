import path from 'path';
import Plugin from './plugin';
import packageReader from '../package/reader';
import { Options } from '../types';
import { Package } from '../package/types';

function getModuleLocation(location: string, dependency: string, semver: string): string {
  if (semver.substring(0, 5) !== 'file:') {
    return path.join(location, 'node_modules', dependency);
  }

  const localPath = semver.substring(5);
  return path.join(location, localPath);
}

export default async function resolver (dependencies: {[key: string]: string;}, options: Options): Promise<Plugin[]> {
  const plugins: Plugin[] = [];
  const promises: Promise<void>[] = [];

  Object.keys(dependencies).forEach((dependency: string) => {
    promises.push(
      packageReader(path.join(getModuleLocation(options.location, dependency, dependencies[dependency]), 'package.json'))
        .then((data: Package) => {
          if (data.main && data[options.packageProperty]) {
            let pluginData = data[options.packageProperty]
            plugins.push(new Plugin(
              pluginData?.name || dependency,
              getModuleLocation(options.location, dependency, dependencies[dependency]),
              pluginData,
              data
            ));
          }
        })
    );
  });
  await Promise.all(promises);
  return plugins;
}
