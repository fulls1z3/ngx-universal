# @ngx-universal/state-transfer
State transferring utility for **Angular Universal**

[![npm version](https://badge.fury.io/js/%40ngx-universal%2Fstate-transfer.svg)](https://www.npmjs.com/package/@ngx-universal/state-transfer)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Adding `@ngx-universal/state-transfer` to your project (SystemJS)](#adding-ngx-universalstate-transfer-to-your-project-systemjs)
  - [app.server.module configuration](#appservermodule-configuration)
  - [app.browser.module configuration](#appbrowsermodule-configuration)
  - [app.module configuration](#appmodule-configuration)
- [Usage](#usage)
- [License](#license)

## Prerequisites
This package depends on `@angular v4.0.0`.

Also, please ensure that you are using **`Typescript v2.3.4`** or higher.

## Getting started
### Installation
You can install **`@ngx-universal/state-transfer`** using `npm`
```
npm install @ngx-universal/state-transfer --save
```

### Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-universal/state-transfer`**.

### Related packages
The following packages may be used in conjunction with **`@ngx-universal/state-transfer`**:
- [@ngx-cache/core]
- [@ngx-cache/platform-browser]
- [@ngx-cache/platform-server]

### Adding `@ngx-universal/state-transfer` to your project (SystemJS)
Add `map` for **`@ngx-universal/state-transfer`** in your `systemjs.config`
```javascript
'@ngx-universal/state-transfer': 'node_modules/@ngx-universal/state-transfer/bundles/state-transfer.umd.min.js'
```

### app.server.module configuration
Import `ServerStateTransferModule` using the mapping `'@ngx-universal/state-transfer'` and append `ServerStateTransferModule.forRoot({...})` within the imports property of **app.server.module** (*considering the app.server.module is the server module in Angular Universal application*).

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

### app.browser.module configuration
Import `BrowserStateTransferModule` using the mapping `'@ngx-universal/state-transfer'` and append `BrowserStateTransferModule.forRoot({...})` within the imports property of **app.browser.module** (*considering the app.browser.module is the browser module in Angular Universal application*).

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

### app.module configuration
Import `HttpTransferModule` using the mapping `'@ngx-universal/state-transfer'` and append `HttpTransferModule.forRoot({...})` within the imports property of **app.module** (*considering the app.module is the core module in Angular application*).

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

> :+1: So good! **`@ngx-universal/state-transfer`** will now transfer the state from the **server platform** to the **browser platform**. 

## Usage
`StateTransferService` has the following methods:
- `initialize(state: Map<string, any>)`: initializes the `STATE` using an existing `Map<string, any>`
- `get(key: string)`: gets some object from `STATE`, by key 
- `set(key: string, value: any)`: puts some object to `STATE`
- `inject()`: injects the `STATE` inside a `<script>` block (*between the `<head>...</head>` tags*)

The following example shows how to read the `STATE` value transferred from the **server platform** to the **browser platform**, using the configuration above.

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
    
    if (!!win && !!win[DEFAULT_STATE_ID])
      stateValue = win[DEFAULT_STATE_ID];
    
    // do something with the value acquired
    // whatever you want ...
  }
}
```

## License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[ng-seed/universal]: https://github.com/ng-seed/universal
[@ngx-cache/core]: https://github.com/ngx-cache/core
[@ngx-cache/platform-browser]: https://github.com/ngx-cache/platform-browser
[@ngx-cache/platform-server]: https://github.com/ngx-cache/platform-server
[Burak Tasci]: https://github.com/fulls1z3
