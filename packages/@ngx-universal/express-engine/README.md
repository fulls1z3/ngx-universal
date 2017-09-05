# @ngx-universal/express-engine [![npm version](https://badge.fury.io/js/%40ngx-universal%2Fexpress-engine.svg)](https://www.npmjs.com/package/@ngx-universal/express-engine) [![npm downloads](https://img.shields.io/npm/dm/%40ngx-universal%2Fexpress-engine.svg)](https://www.npmjs.com/package/@ngx-universal/express-engine)
Express engine for **Angular Universal**

[![CircleCI](https://circleci.com/gh/fulls1z3/ngx-universal.svg?style=shield)](https://circleci.com/gh/fulls1z3/ngx-universal)
[![coverage](https://codecov.io/github/fulls1z3/ngx-universal/coverage.svg?branch=master)](https://codecov.io/gh/fulls1z3/ngx-universal)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)

> Please support this project by simply putting a Github star. Share this library with friends on Twitter and everywhere else you can.

## Table of contents:
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Installation](#installation)
	- [Examples](#examples)
	- [Related packages](#related-packages)
	- [Adding `@ngx-universal/express-engine` to your project (SystemJS)](#adding-systemjs)
  - [server configuration](#server-config)
- [License](#license)

## <a name="prerequisites"></a> Prerequisites
This package depends on `Angular v4.0.0`.

Also, please ensure that you are using **`Typescript v2.3.4`** or higher.

## <a name="getting-started"></a> Getting started
### <a name="installation"></a> Installation
You can install **`@ngx-universal/express-engine`** using `npm`
```
npm install @ngx-universal/express-engine --save
```

### <a name="examples"></a> Examples
- [ng-seed/universal] is an officially maintained seed project, showcasing common patterns and best practices for **`@ngx-universal/express-engine`**.

### <a name="adding-systemjs"></a> Adding `@ngx-universal/express-engine` to your project (SystemJS)
Add `map` for **`@ngx-universal/express-engine`** in your `systemjs.config`
```javascript
'@ngx-universal/express-engine': 'node_modules/@ngx-universal/express-engine/bundles/express-engine.umd.min.js'
```

### <a name="server-config"></a> server configuration
Import `ngExpressEngine` using the mapping `'@ngx-universal/express-engine'` on your **server configuration** (*ex: server.ts*)
and bootstrap the `AppServerModule` (*considering app.server.module is the server module in Angular Universal application*)
using `ngExpressEngine` as follows:

```TypeScript
...
import * as express from 'express';
import { ngExpressEngine } from '@ngx-universal/express-engine';
import { AppServerModule } from './app.server.module';
...

const server = express();

server.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

server.set('view engine', 'html');
server.set('views', 'public');
...
```

> :+1: Wow! **`@ngx-universal/express-engine`** will now bootstrap the `AppServerModule` on the **server** platform.

## <a name="license"></a> License
The MIT License (MIT)

Copyright (c) 2017 [Burak Tasci]

[ng-seed/universal]: https://github.com/ng-seed/universal
[Burak Tasci]: https://github.com/fulls1z3
