<h1 align="center">SmartEdit E2E</h1>
The smartedit-e2e library contains the end-to-end tests of the SmartEdit extension.

## Prerequisites

To execute the smartedit-e2e library it must be added to `rush.json`. To do this, please build the smartedittools as described in the [smartedittools README.md](../../#commands). Once this is done, the smartedit-e2e will have a copy of node_modules in it.

> 🚧 Important Note
>
> Never execute `npm install` directly on the smartedit-e2e library folder. The smartedit-e2e library and all other npm packages in the SmartEdit repository are managed only through the Rush tooling.

## Commands

The following list contains the commands that can be executed in the smartedit-e2e library:

-   clean:
    The following command can be used to clean any temporary files that were generated in previous test executions.
    ```bash
    npm run clean
    ```
-   e2e

    The following command can be used to execute end-to-end tests. Tests will be executed sequentially in the background.

    ```bash
    npm run e2e
    ```

-   e2e:debug

    The following command can be used to execute end-to-end tests. Tests will be executed sequentially. A browser window will be opened and will show each test being executed.

    ```bash
    npm run e2e:debug
    ```

-   e2e:max

    The following command can be used to execute end-to-end tests in parallel in the background.

    ```bash
    npm run e2e:max
    ```

-   e2e:ci

    The following command can be used to execute end-to-end tests in CI. It configures Protractor in the appropriate way for CI.

    ```bash
    npm run e2e:ci
    ```

-   dev

    The following command can be used to run the test servers used in e2e tests, and leave them running in the background. A developer can navigate to http://127.0.0.1:7000 and see the sample SmartEdit container and sample storefronts used in tests. This can be useful when debugging tests.

    ```bash
    npm run dev
    ```
