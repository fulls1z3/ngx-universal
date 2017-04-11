// angular
import { NgModule } from '@angular/core';

// module
import { ServerStateTransferService } from './src/server-state-transfer.service';
import { HttpTransferService } from './src/http-transfer.service';
import { StateTransferService } from './src/state-transfer.service';

export * from './src/server-state-transfer.service';
export * from './src/state-transfer.service';
export * from './src/http-transfer.service';

// for AoT compilation
export function stateTransferFactory(): StateTransferService {
  const stateTransfer = new StateTransferService();
  stateTransfer.initialize(window['TRANSFER_STATE'] || {});

  return stateTransfer;
}

@NgModule({
  providers: [
    {
      provide: StateTransferService,
      useFactory: (stateTransferFactory)
    }
  ]
})
export class BrowserStateTransferModule {
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
}

@NgModule({
  providers: [
    HttpTransferService
  ]
})
export class HttpTransferModule {
}
