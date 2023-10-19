import path from 'node:path';
import Plugin from './plugin';
import packageReader from '../package/reader';
import type { Package } from '../package/types';
import type { InternalOptions } from '../types';

function getModuleLocation(location: string, dependency: string, semver: string): string {
  if (semver.slice(0, 5) !== 'file:') {
    return path.join(location, 'node_modules', dependency);
  }

  const localPath = semver.slice(5);
  return path.join(location, localPath);
}

export default async function resolver(
  dependencies: Record<string, string>,
  options: InternalOptions
): Promise<Plugin[]> {
  const plugins: Plugin[] = [];
  const promises: Promise<void>[] = [];

  for (const dependency of Object.keys(dependencies)) {
    if (typeof dependencies[dependency] !== 'string') {
      continue;
    }

    // We explicitly set this as string, because we checked this in the line above, but TS does not get that.
    const dependencyVersion = dependencies[dependency] as string;
    promises.push(
      packageReader(path.join(getModuleLocation(options.location, dependency, dependencyVersion), 'package.json')).then(
        (data: Package) => {
          if (
            data[options.packageProperty] &&
            ((options.requirePackageMain && data['main']) || !options.requirePackageMain)
          ) {
            const pluginData = data[options.packageProperty];
            plugins.push(
              new Plugin(
                pluginData?.name || dependency,
                getModuleLocation(options.location, dependency, dependencyVersion),
                pluginData,
                data,
                !!data['main']
              )
            );
          }
        }
      )
    );
  }

  await Promise.all(promises);
  return plugins;
}
