<h1 align="center">Storefront Generator</h1>
The storefront-generator is a tool to generate and manipulate a storefront DOM to simulate different types of storefront in different technologies/stacks. This is useful to setup sample storefronts for e2e tests. By default, it contains a pre-built 
sample storefront, but that can be customized by the sf-builder to accommodate other use cases needed in e2e tests.

<h2 align="center">Getting Started</h2>

## Prerequisites

To execute the storefront-generator it must be added to `rush.json` (this should be the case out-of-the-box) and it must be installed with Rush. To do this, please follow the instructions in [smartedittools](../../#commands). Once this is done, the storefront-generator will have a copy of node_modules in it.

> 🚧 Important Note
>
> Never execute `npm install` directly on the storefront-generator folder. The storefront-generator and all other npm packages in the SmartEdit repository are managed only through the Rush tooling.

## Building

The following snippet shows the command used to build the library:

```bash
npm run build
```

## How to Use Storefront Generator

The storefront-generator is a tool to generate and manipulate a storefront DOM to simulate different types of storefront and front end technologies/stacks.

By default, the storefront-generator contains a sample storefront with pre-generated pages. It is located in the `dummystorefront/` folder. You can reference any pages in that folder from your e2e tests. For example, you could reference an
empty Angular page from the following path: `node_modules/@smartedit/storefront-generator/dummystorefront/fakeAngularEmptyPage.html`.

It is possible to create new pages, or even manipulate existing pages in the test storefront, by using the [sf-builder](./dummystorefront/builder/sf-builder.js).Please check the documentation for more information.
