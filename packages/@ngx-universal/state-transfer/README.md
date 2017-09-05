# @ngx-universal/state-transfer [![npm version](https://badge.fury.io/js/%40ngx-universal%2Fstate-transfer.svg)](https://www.npmjs.com/package/@ngx-universal/state-transfer) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-universal%2Fstate-transfer.svg)](https://www.npmjs.com/package/@ngx-universal/state-transfer)
State transferring utility for **Angular Universal**

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-universal.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-universal)
[![coverage](https://codecov.io/github/fulls1z3/ngx-universal/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-universal)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

#### NOTICE
> This *[4.x.x] branch* is intented to work with `@angular v4.x.x`. If you're developing on a later release of **Angular**
than `v4.x.x`, then you should probably choose the appropriate version of this library by visiting the *[master] branch*.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Adding `@ngx-universal/state-transfer` to your project (SystemJS)](#adding-systemjs)
  - [app.server.module configuration](#server-config)
  - [app.browser.module configuration](#browser-config)
  - [app.module configuration](#appmodule-config)
- [Usage](#usage)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
This library depends on `Angular v4.0.0`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v2.3.4`** or higher.

## <a name="getting-started"></a> Getting started
### <a name="installation"></a> Installation
You can install **`@ngx-universal/state-transfer`** using `npm`
```
npm install @ngx-universal/state-transfer --save
```

### <a name="examples"></a> Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-universal/state-transfer`**.

### <a name="related-packages"></a> Related packages
The following packages may be used in conjunction with **`@ngx-universal/state-transfer`**:
- [@ngx-cache/core]
- [@ngx-cache/platform-browser]
- [@ngx-cache/platform-server]

### <a name="adding-systemjs"></a> Adding `@ngx-universal/state-transfer` to your project (SystemJS)
Add `map` for **`@ngx-universal/state-transfer`** in your `systemjs.config`
```javascript
'@ngx-universal/state-transfer': 'node_modules/@ngx-universal/state-transfer/bundles/state-transfer.umd.min.js'
```

### <a name="server-config"></a> app.server.module configuration
Import `ServerStateTransferModule` using the mapping `'@ngx-universal/state-transfer'` and append `ServerStateTransferModule.forRoot({...})`
within the imports property of **app.server.module** (*considering the app.server.module is the server module in Angular
Universal application*).

```TypeScript
...
import { ServerStateTransferModule, StateTransferService } from '@ngx-universal/state-transfer';
...

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    ServerModule,
    ServerStateTransferModule.forRoot(),
    AppModule
  ],
  ...
  bootstrap: [AppComponent]
})
export class AppServerModule {
  constructor(private readonly stateTransfer: StateTransferService) {
  }

  ngOnBootstrap = () => {
    this.stateTransfer.set('test_key', JSON.stringify({'value': 'test'}));
    this.stateTransfer.inject();
  }
}
```

### <a name="browser-config"></a> app.browser.module configuration
Import `BrowserStateTransferModule` using the mapping `'@ngx-universal/state-transfer'` and append `BrowserStateTransferModule.forRoot({...})`
within the imports property of **app.browser.module** (*considering the app.browser.module is the browser module in Angular
Universal application*).

```TypeScript
...
import { BrowserStateTransferModule } from '@ngx-universal/state-transfer';
...

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserStateTransferModule.forRoot(),
    AppModule
  ],
  ...
  bootstrap: [LayoutMainComponent]
})
export class AppBrowserModule {
}
```

### <a name="appmodule-config"></a> app.module configuration
Import `HttpTransferModule` using the mapping `'@ngx-universal/state-transfer'` and append `HttpTransferModule.forRoot({...})`
within the imports property of **app.module** (*considering the app.module is the core module in Angular application*).

```TypeScript
...
import { HttpTransferModule } from '@ngx-universal/state-transfer';
...

@NgModule({
  imports: [
    BrowserModule,
    HttpTransferModule.forRoot(),
    ...
  ],
  ...
  bootstrap: [AppComponent]
})
export class AppModule {
  ...
}
```

> :+1: So good! **`@ngx-universal/state-transfer`** will now transfer the state from the **server platform** to the **browser
platform**. 

## <a name="usage"></a> Usage
`StateTransferService` has the following methods:
- `initialize(state: Map<string, any>)`: initializes the `STATE` using an existing `Map<string, any>`
- `get(key: string)`: gets some object from `STATE`, by key 
- `set(key: string, value: any)`: puts some object to `STATE`
- `inject()`: injects the `STATE` inside a `<script>` block (*between the `<head>...</head>` tags*)

The following example shows how to read the `STATE` value transferred from the **server platform** to the **browser platform**,
using the configuration above.

#### app.browser.module
```TypeScript
...
import { BrowserStateTransferModule, DEFAULT_STATE_ID } from '@ngx-universal/state-transfer';
...

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    BrowserStateTransferModule.forRoot(),
    AppModule
  ],
  ...
  bootstrap: [LayoutMainComponent]
})
export class AppBrowserModule {
  constructor() {
    // get `STATE` value (injected by the server platform)
    let stateValue = undefined;
    
    const win: any = window;
    
    if (win && win[DEFAULT_STATE_ID])
      stateValue = win[DEFAULT_STATE_ID];
    
    // do something with the value acquired
    // whatever you want ...
  }
}
```

## <a name="license"></a> License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[master]: https://github.com/ngx-universal/core/tree/master
[4.x.x]: https://github.com/ngx-universal/core/tree/4.x.x
[ng-seed/universal]: https://github.com/ng-seed/universal
[@ngx-cache/core]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/core
[@ngx-cache/platform-browser]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/platform-browser
[@ngx-cache/platform-server]: https://github.com/fulls1z3/ngx-cache/tree/master/packages/@ngx-cache/platform-server
[Burak Tasci]: https://github.com/fulls1z3
