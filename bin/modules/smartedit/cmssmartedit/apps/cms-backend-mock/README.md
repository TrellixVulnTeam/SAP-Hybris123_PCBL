<h1 align="center">Cms Backend Mock</h1>

The cms-backend-mock library is a NestJS server-side application that mimics backend functionality for Contract Testing purposes. It executes two types of tests:

1. It is used as middleware in e2e execution. It throws an error if an API does not respect the API contract
2. Also used to generate unit tests based on contracts that are executed with Mocha

For more information on NestJS refer to the documentation page
[here](https://docs.nestjs.com/).

## Prerequisites

To execute the cms-backend-mock it must be added to `rush.json` (this should be the case out-of-the-box) and it must be installed with Rush. To do this, please follow the instructions in [smartedittools](../../#commands). Once this is done, the cms-backend-mock will have a copy of node_modules in it.

> 🚧 Important Note
>
> Never execute `npm install` directly on the cms-backend-mock folder. The cms-backend-mock and all other npm packages in the SmartEdit repository are managed only through the Rush tooling.

## Functionality

cms-backend-mock fetches Open API specifications(Contracts) and verifies that the Frontend is compliant with the contracts using the following tools:

-   [Swagger middleware](https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md) that validates requests/responses based on the operations stated in the Contract.
-   [OpenAPI Test Templates](https://github.com/google/oatts) that generates basic unit tests based on the Contract information and runs those against a backend-mock.

cms-backend-mock runs on http://localhost:3333, any changes to which has to be reflected in `outerGlobalBasePathFetchMock`, and concurently starts on execution of either **npm run e2e**, **npm run e2e:max** or **npm run dev** commands (this applies to cms-smartedit-e2e).

### Fetching contracts

The **postinstall.js** script processes properties stated in **config.yml** and fetches contracts from the Maven repository. **config.yml** contains the following required properties:

| Property         |                 Description                  |
| ---------------- | :------------------------------------------: |
| REPO_URL         |  Maven repository that contains an artifact  |
| ARTIFACT         |              groupId:artifactId              |
| ARTIFACT_VERSION |           Version of the artifact            |
| CONTRACTS        | Space separated list of contracts to extract |

**IMPORTANT**

-   ARTIFACT_VERSION must be a precise version as fetching latest is not possible! For the list of available versions, search for **smartedit-apis** in [SAP Artifactory](https://common.repositories.sap.ondemand.com/artifactory/webapp/#/home).

## Commands

The following list contains the commands that can be executed in the cms-backend-mock library:

-   Download Swagger Contracts

    The following command downloads the contracts from Maven and gets them ready for contract testing.

    ```bash
    npm run postinstall
    ```

-   Start Nest

    This command starts the nest server in http://localhost:3333. This is necessary when running e2e tests.

    ```bash
    npm run start
    ```

-   Start Swagger Debug

    The command starts the Nest server in http://localhost:3333. The server is started in debug mode.

    ```bash
    npm run startSwaggerDebug
    ```

-   Build

    This command builds the nest server and leaves the server ready to be used for contract or e2e testing.

    ```bash
    npm run build
    ```

-   Contract Testing

    This command generates and executes tests to ensure contracts are respected.

    ```bash
    npm run contract-testing
    ```
