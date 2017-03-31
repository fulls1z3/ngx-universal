# @nglibs/universal-transfer-state [![npm version](https://badge.fury.io/js/%40nglibs%2Funiversal-express-engine.svg)](https://www.npmjs.com/package/@nglibs/universal-transfer-state)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

> This repository holds the TypeScript source code and distributable bundle of **`@nglibs/universal-transfer-state`**, the state transferring module for **Angular Universal**.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [`@nglibs` packages](#nglibs-packages)
	- [Adding `@nglibs/universal-transfer-state` to your project (SystemJS)](#adding-nglibsconfig-to-your-project-systemjs)
  - [app.server.module configuration](#appservermodule-configuration)
  - [app.browser.module configuration](#appbrowsermodule-configuration)
  - [app.module configuration](#appmodule-configuration)
- [License](#license)

## Prerequisites
This package depends on `@angular v4.0.0`.

Also, please ensure that you are using **`Typescript v2.1.6`** or higher.

## Getting started
### Installation
You can install **`@nglibs/universal-transfer-state`** using `npm`
```
npm install @nglibs/universal-transfer-state --save
```

**Note**: You should have already installed [@nglibs/universal-transfer-http].

### Examples
- [@nglibs/universal-example-app] is an officially maintained example application showcasing best practices for **[@nglibs]** utilities **Angular Universal**/`@angular v4.0.0`.

### `@nglibs` packages

- [@nglibs/config]
- [@nglibs/meta]
- [@nglibs/i18n-router]
- [@nglibs/i18n-router-config-loader]
- [@nglibs/universal-express-engine]
- [@nglibs/universal-transfer-state]

### Adding `@nglibs/universal-transfer-state` to your project (SystemJS)
Add `map` for **`@nglibs/universal-transfer-state`** in your `systemjs.config`
```javascript
'@nglibs/universal-transfer-state': 'node_modules/@nglibs/universal-transfer-state/bundles/universal-transfer-state.umd.min.js'
```

### app.server.module configuration
Import `ServerTransferStateModule` and `TransferState` using the mapping `'@nglibs/universal-transfer-state'` and append `ServerTrnasferStatemodule` within the imports property of **app.server.module** (*considering the app.server.module is the server module in Angular Universal application*).

```TypeScript
...
import { ServerTransferStateModule, TransferState } from '@nglibs/universal-transfer-state';
...

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    ServerModule,
    ServerTransferStateModule,
    AppModule
  ]
})
export class AppServerModule {
  constructor(private readonly transferState: TransferState) {
  }

  ngOnBootstrap = () => {
    this.transferState.inject();
  }
}
```

### app.browser.module configuration
Import `BrowserTransferStateModule` using the mapping `'@nglibs/universal-transfer-state'` and append `BrowserTransferStateModule` within the imports property of **app.browser.module** (*considering the app.browser.module is the browser module in Angular Universal application*).

```TypeScript
...
import { BrowserTransferStateModule } from '@nglibs/universal-transfer-state';
...

@NgModule({
  bootstrap: [LayoutMainComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserTransferStateModule,
    AppModule
  ]
})
export class AppBrowserModule {
}
```

### app.module configuration
Import `TransferHttpModule` using the mapping `'@nglibs/universal-transfer-state'` and append `TransferHttpModule` within the imports property of **app.module** (*considering the app.module is the core module in Angular application*).

```TypeScript
...
import { TransferHttpModule } from '@nglibs/universal-transfer-state';
...

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    TransferHttpModule,
    ...
  ],
  ...
})
export class AppModule {
  ...
}
```

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[@nglibs]: https://github.com/nglibs
[@nglibs/universal-example-app]: https://github.com/nglibs/universal-example-app
[@nglibs/config]: https://github.com/nglibs/config
[@nglibs/meta]: https://github.com/nglibs/meta
[@nglibs/i18n-router]: https://github.com/nglibs/i18n-router
[@nglibs/i18n-router-config-loader]: https://github.com/nglibs/i18n-router-config-loader
[@nglibs/universal-express-engine]: https://github.com/nglibs/universal-express-engine
[@nglibs/universal-transfer-state]: https://github.com/nglibs/universal-transfer-state
[forRoot]: https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[Burak Tasci]: http://www.buraktasci.com
