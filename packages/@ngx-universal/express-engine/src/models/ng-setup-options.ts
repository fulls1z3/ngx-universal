// angular
import { NgModuleFactory, Provider, Type } from '@angular/core';

/**
 * These are the allowed options for the engine
 */
export interface NgSetupOptions {
  aot?: boolean;
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  providers?: Array<Provider>;
}
