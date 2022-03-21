<h1 align="center">SmartEdit E2E Utils</h1>
The smartedit-e2e-utils is a package that provides tools and other common functionality needed to run e2e tests.

## Prerequisites

To execute the smartedit-e2e-utils it must be added to rush.json (this should be the case out-of-the-box) and it must be installed with Rush. To do this, please follow the instructions in [smartedittools](../../#commands). Once this is done, the smartedit-e2e-utils will have a copy of node_modules in it.

> 🚧 Important Note
>
> Never execute `npm install` directly on the smartedit-e2e-utils folder. The smartedit-e2e-utils and all other npm packages in the SmartEdit repository are managed only through the Rush tooling.

<h2 align="center">Getting Started</h2>

## Building Library

Before being able to use the smartedit-e2e-utils library it is necessary to build. The following snippet shows how to build the library:

```js
npm run build
```

<h2 align="center">Features</h2>

## Protractor

The smartedit-e2e-utils library contains a [Protractor](https://www.protractortest.org/#/) wrapper that can be used to configure and run SmartEdit e2e tests. The following snippet shows how to run tests:

```js
const { runProtractor } = require('@smartedit/e2e-utils');

const testsConfig = {
    basePath: path.resolve('.'),
    storefrontPath: 'path/to/storefront',
    htmlPath: 'path/to/entry',
    testObjectsPath: path.resolve('./tests/utils'),
    reportOutputPath: path.resolve('./generated/junit'),
    headless: false,
    multi: false
};

(async () => {
    try {
        await runProtractor(testsConfig);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
```

### Configuration Options

The following snippet shows the different configuration options that can be provided when running protractor through the smartedit-e2e-utils library:

```js
{
    basePath; // Specifies the root folder. Tests will be searched from this folder.
    storefrontPath; // The path to the HTML file used to render the storefront (inner frame).
    htmlPath; // The path to the HTML file used to render the outer-frame.
    testObjectsPath; // The path to the folder containing component and test objects used in e2e tests.
    reportOutputPath; // The path where the junit reports will be generated.
    headless; // Optional boolean. If true, tests will be run in the background, without opening a browser window.
    shardTestFiles; // Optional boolean. If true, tests will be sharded and multiple instances of protractor will be run in parallel.
    maxInstances; // The number of instances to run in parallel. By default this is 1.
    shards; // Optional parameter. Useful in CI. Specifies the number of "parts" into which the tests will be split.
    shard; // Optional parameter. Useful in CI. Specifies the "part" of tests that will be run in the current Jenkin slave.
}
```

> 🚧 Important Note
>
> ShardTestFiles and maxInstances are different from shards and shard. The former parameters are used to run tests parallely in the same computer. Shards and shard parameters are needed to split tests amongst multiple Jenkins slaves.

## Instrumenter

The sources of SmartEdit libraries are instrumented whenever they are compiled by the smartedit-packagr. However, e2e tests are not built through the bundler. Therefore, they also need to be instrumented. The smartedit-e2e-utils library provides such functionality. The following snippet shows the basic setup:

```js
const { seInjectableInstrumenter } = require('@smartedit/e2e-utils');
const fg = require('fast-glob');

const instrumentTestFiles = async () => {
    // Find test files
    const filesToMatchPattern = './generated/**/*.ts';
    const matchedFiles = await fg(filesToMatchPattern);

    // Instrument files
    seInjectableInstrumenter(matchedFiles);
};

(async () => {
    try {
        instrumentTestFiles();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
```

## Shared Code

The smartedit-e2e-utils library contains a `shared/` folder that contains common mocks and component objects used in both, smartedit-e2e and cms-smartedit-e2e libraries.
