// angular
import { NgModule } from '@angular/core';

// module
import { ServerTransferState } from './src/server-transfer-state';
import { TransferHttp } from './src/transfer-http';
import { TransferState } from './src/transfer-state';

export * from './src/server-transfer-state';
export * from './src/transfer-state';
export * from './src/transfer-http';

// for AoT compilation
export function getTransferState(): TransferState {
  const transferState = new TransferState();
  transferState.initialize(window['TRANSFER_STATE'] || {});

  return transferState;
}

@NgModule({
  providers: [
    {
      provide: TransferState,
      useFactory: (getTransferState)
    }
  ]
})
export class BrowserTransferStateModule {
}

@NgModule({
  providers: [
    {
      provide: TransferState,
      useClass: ServerTransferState
    }
  ]
})
export class ServerTransferStateModule {
}

@NgModule({
  providers: [
    TransferHttp
  ]
})
export class TransferHttpModule {
}
