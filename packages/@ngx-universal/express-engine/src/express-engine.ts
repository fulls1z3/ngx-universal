// angular
import { ApplicationRef, NgModuleFactory, NgModuleRef, Provider, Type } from '@angular/core';
import { INITIAL_CONFIG, platformDynamicServer, platformServer, PlatformState } from '@angular/platform-server';

// libs
import * as fs from 'fs';
import { Request, Response, Send } from 'express';

// module
import { NgSetupOptions } from './models/ng-setup-options';

/**
 * This holds a cached version of each index used.
 */
const templateCache: { [key: string]: string } = {};

function getRequestResponseProviders(req: Request, res: Response): Array<Provider> {
  const providers: Array<Provider> = [
    {
      provide: 'REQUEST',
      useValue: req
    }
  ];

  if (res)
    providers.push({
      provide: 'RESPONSE',
      useValue: res
    });

  return providers;
}

/**
 * Get the document at the file path
 */
function getDocument(filePath: string): string {
  return templateCache[filePath] = templateCache[filePath] || fs.readFileSync(filePath).toString();
}

/**
 * Handle the request with a given NgModuleRef
 */
function handleModuleRef(moduleRef: NgModuleRef<{}>, callback: any): void {
  const state = moduleRef.injector.get(PlatformState);
  const appRef = moduleRef.injector.get(ApplicationRef);

  appRef.isStable
    .filter((isStable: boolean) => isStable)
    .first()
    .subscribe(() => {
      const bootstrap = moduleRef.instance['ngOnBootstrap'];
      bootstrap();

      callback(state.renderToString());
      moduleRef.destroy();
    });
}

/**
 * This is an express engine for handling Angular Applications
 */
export function ngExpressEngine(setupOptions: NgSetupOptions): any {
  setupOptions.providers = setupOptions.providers || [];

  return (filePath: string, options: { req: Request, res?: Response }, callback: Send): void => {
    try {
      const moduleFactory = setupOptions.bootstrap;

      if (!moduleFactory)
        throw new Error('You must pass in a NgModule or NgModuleFactory to be bootstrapped');

      const extraProviders = setupOptions.providers.concat(
        getRequestResponseProviders(options.req, options.res),
        [
          {
            provide: INITIAL_CONFIG,
            useValue: {
              document: getDocument(filePath),
              url: options.req.originalUrl
            }
          }
        ]);

      const moduleRefPromise = setupOptions.aot ?
        platformServer(extraProviders).bootstrapModuleFactory(moduleFactory as NgModuleFactory<{}>) :
        platformDynamicServer(extraProviders).bootstrapModule(moduleFactory as Type<{}>);

      moduleRefPromise.then((moduleRef: NgModuleRef<{}>) => {
        handleModuleRef(moduleRef, callback);
      });
    } catch (e) {
      callback(e);
    }
  };
}
