<h1 align="center">Test Server</h1>
The Test Server library starts locally a simple HTTP server that will serve files from a base folder. This is useful to run mock servers needed for e2e tests.

> 📘 Note
>
> This test server library relies on [Connect](https://github.com/senchalabs/connect). Some configuration options, like middlewares, follow a similar format as in Connect.

<h2 align="center">Getting Started</h1>

## Prerequisites

To execute the test-server it must be added to `rush.json` (this should be the case out-of-the-box) and it must be installed using Rush. To do this, please follow the instructions in [smartedittools](../../#commands). Once this is done, the test-server will have a copy of node_modules in it.

> 🚧 Important Note
>
> Never execute `npm install` directly on the test-server folder. The test-server and all other npm packages in the SmartEdit repository are managed only through the Rush tooling.

## Executing Test Server

The test-server must be imported as an npm dev-dependency in the project where it is meant to be used. The following snippet shows how to start and connect to an instance of the test-server:

```js
const { connectToServer } = require('@smartedit/test-server');

const testServerPath = './';

const options = {
    base: testServerPath,
    port: 7000,
    keepalive: false,
    debug: false,
    open: true,
    middleware: (connect, options, middlewares) => {
        return middlewares;
    }
};

connectToServer(options);
```

Once the server is connected, it is capable or serving static files. Also, if you navigate to the server (for example, http://127.0.0.1:7000) you can browse through the directories being served by the server.

## Configuration Options

The following snippet describes the possible test-server configuration options:

```js
{
    base; // Optional. The path to the base/root folder that the server will serve. ./ will be used as default.
    port; // Optional. The TCP port that the server will use. The default port is 9000.
    keepalive; // Optional boolean. If true, the server will stay alive in the background.
    debug; // Currently not used. In the future, it will enable debugging information.
    open; // Optional boolean. If true, it will open a new browser window and navigate to the root server folder.
    middleware; // Optional function. It can be used to specify middlewares that extend the server functionality. Please check Connect's middleware documentation (https://github.com/senchalabs/connect#use-middleware).
}
```
