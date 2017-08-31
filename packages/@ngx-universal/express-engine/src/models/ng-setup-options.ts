// angular
import { NgModuleFactory, Provider, Type } from '@angular/core';

export interface NgSetupOptions {
  aot?: boolean;
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  providers?: Array<Provider>;
}
