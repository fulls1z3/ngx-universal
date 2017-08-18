// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

// module
import { DEFAULT_STATE_ID, ServerStateTransferService, STATE_ID } from './src/server-state-transfer.service';
import { HttpTransferService } from './src/http-transfer.service';
import { StateTransferService } from './src/state-transfer.service';

export * from './src/server-state-transfer.service';
export * from './src/state-transfer.service';
export * from './src/http-transfer.service';

// for AoT compilation
export function stateTransferFactory(stateId: string): StateTransferService {
  const stateTransfer = new StateTransferService();
  stateTransfer.initialize(window[stateId] || {});

  return stateTransfer;
}

@NgModule({
  providers: [
    HttpTransferService
  ]
})
export class HttpTransferModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: HttpTransferModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: HttpTransferModule) {
    if (parentModule)
      throw new Error('HttpTransferModule already loaded; import in root module only.');
  }
}

@NgModule()
export class BrowserStateTransferModule {
  static forRoot(stateId: string = DEFAULT_STATE_ID): ModuleWithProviders {
    return {
      ngModule: BrowserStateTransferModule,
      providers: [
        {
          provide: StateTransferService,
          useFactory: (stateTransferFactory),
          deps: [STATE_ID]
        },
        {
          provide: STATE_ID,
          useValue: stateId
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: BrowserStateTransferModule) {
    if (parentModule)
      throw new Error('BrowserStateTransferModule already loaded; import in BROWSER module only.');
  }
}

@NgModule({
  providers: [
    {
      provide: StateTransferService,
      useClass: ServerStateTransferService
    }
  ]
})
export class ServerStateTransferModule {
  static forRoot(stateId: string = DEFAULT_STATE_ID): ModuleWithProviders {
    return {
      ngModule: ServerStateTransferModule,
      providers: [
        {
          provide: STATE_ID,
          useValue: stateId
        }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ServerStateTransferModule) {
    if (parentModule)
      throw new Error('ServerStateTransferModule already loaded; import in SERVER module only.');
  }
}
