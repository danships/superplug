A generic purpose plugin loading system to be used in node projects. It uses npm modules
and annotations in package.json to easily set up a project with plugin support. It is fully Promise-based.

**This module is currently in alpha. The API can be changed in a release without
warning. When version 1.0 is released semver versioning will be used.**

**This module currently only supports loading plugins that are dependencies in the projects' package.json,
but the goal is to be able to specify an external plugin repository, separate from the project.**

# Usage

## Setup

First add SuperPlug as a dependency to the node project you want to add plugin support to.

    npm install --save superplug

In the code where the plugins are to be initialized, use the SuperPlug class:

    const SuperPlug = require('superplug')
    let plugins = new SuperPlug({}) //see configuration section for more details on configuration

    plugins.getPlugins()
      .then(function (foundPlugins) {
        //do something with the returned plugins
        for (var iter in foundPlugins) {

          //in this example a plugin is expected to return an object that exposes a method called start
          foundPlugins[iter].getPlugin.start()
        }
      })

In the example above, foundPlugins is an array with Plugin classes. Each Plugin class
has the following methods:

1. `getName()` - Get the name of the plugin, as defined in the SuperPlug annotation.
2. `getModuleName()` - Get the name of the npm module.
3. `getRawProperty()` - Get the object with the plugin metadata as defined in the plugins' `package.json`.
4. `getPlugin()` - Returns a Promise which will resolve to the plugins module `main` file as defined in `package.json`.


## Plugins

A plugin must define an attribute in its `package.json` that will indicate to SuperPlug that this
is a plugin that must be loaded. The name of the attribute to search for is defined in
the configuration. You are advised to select a unique property name specific to your project,
so that it is not possible to inadvertently include plugins from other projects.

The export of the file referenced in the `main` attribute is returned by the `getPlugin()`
function. You are responsible for defining a format or standard for the implementation
that the plugin should return. Object, functions, properties, etc.

### Example

```
{
  "name": "superplug-example-plugin",
  "version": "1.0.0",
  "description": "An example plugin.",
  "main": "index.js",
  "superplug": {
    "name": "superplug-plugin",
    "foo": "bar"
  }
}
```

# Configuration

The SuperPlug constructor expects an options object argument.

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| location | The path to look for the _package.json_ file | `./` |
| packageProperty | The name of the property to search for in the _package.json_ file. | superplug |

# Roadmap

The following items are on the roadmap to be added:

1. Allow for the package.json to be loaded from an external folder, not the project itself.
2. Definition of implemented API version by the plugin, to be able to check if a plugin is outdated.
3. Validator function in the configuration to check the exposed functions by the plugin

# Contributing

Contributions are always welcome. This is not necessarily code, it can also be updated documentations,
tutorials, bug reports or pull requests.

Please create an Issue to discuss a feature you want to implement, so that the details
can be discussed in advance.
