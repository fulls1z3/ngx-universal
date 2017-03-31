// angular
import { Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { PlatformState } from '@angular/platform-server';

// module
import { TransferState } from './transfer-state';

@Injectable()
export class ServerTransferState extends TransferState {
  constructor(private state: PlatformState, private rendererFactory: RendererFactory2) {
    super();
  }

  /**
   * Inject the State into the bottom of the <head>
   */
  inject(): void {
    try {
      const document: any = this.state.getDocument();
      const transferStateString = JSON.stringify(this.toJson());
      const renderer = this.rendererFactory.createRenderer(document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      const html: any = Array.from(document.children).find((child: any) => child.name === 'html');
      const head = Array.from(html.children).find((child: any) => child.name === 'head');

      if (!head)
        throw new Error('<head> not found in the document');

      const script = renderer.createElement('script');
      renderer.setValue(script, `window['TRANSFER_STATE'] = ${transferStateString}`);
      renderer.appendChild(head, script);
    } catch (e) {
      console.error(e);
    }
  }
}
