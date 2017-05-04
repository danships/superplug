A generic purpose plugin loading system to be used in node projects. It uses npm modules
and annotations in package.json to easily set up a project with plugin support. It is fully Promise-based.

**This module is currently in alpha. The API can be changed in a release without
warning. When version 1.0 is released semver versioning will be used.**

# Usage

## Setup

First add SuperPlug as a dependency to the node project you want to add plugin support to.

    npm install --save superplug

Second determine the location from which you to load the dependencies from. **This must be
an absolute path.** The path must be absolute because the _require()_ function in the
SuperPlug module has a different relative path than the project it is included in.

You can use a separate folder outside your project to hold your plugins. This allows for a different
installed set of plugins per installation. Create a `package.json` file in the folder, and install
the desired plugins via `npm install`. The you other option is to install the plugins into the project
itself, then the location to use is `__dirname`, which is the absolute path to the script
initializing SuperPlug. Update the path to have it point to the folder the `package.json` is in.

In the code where the plugins are to be initialized, use the SuperPlug class:

    const SuperPlug = require('superplug')
    let plugins = new SuperPlug({location: \__dirname}) //see configuration section for more details on configuration

    plugins.getPlugins()
      .then(function (foundPlugins) {
        //do something with the returned plugins
        for (var iter in foundPlugins) {

          //in this example a plugin is expected to return an object that exposes a method called start
          foundPlugins[iter].getPlugin()
            .then(function(pluginModule) {
              pluginModule.start()
            })
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

| Property | Required | Description | Default Value |
| -------- |-------- |----------- | ------------- |
| location | Yes | The path to look for the _package.json_ file. This must be an absolute path. | |
| packageProperty | No | The name of the property to search for in the _package.json_ file. | superplug |

# Roadmap

The following items are on the roadmap to be added:

1. Definition of implemented API version by the plugin, to be able to check if a plugin is outdated.
2. Validator function in the configuration to check if the implementation of the plugin is correct.
3. Functions to install plugins, using `npm install`.

# Contributing

Contributions are welcome. This does not necessarily have to be code, it can also be updated documentation,
tutorials, bug reports or pull requests.

Please create an Issue to discuss a feature you want to implement, so that the details
can be discussed in advance.
