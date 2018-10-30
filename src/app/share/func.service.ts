import { Injectable } from '@angular/core';
declare var Blockly: any;

@Injectable({
  providedIn: 'root'
})
export class FuncService {
  constructor() {}

  /**
   * 发送game消息
   */
  send(msg: string) {
    (<any>document.getElementById(Blockly.UserConfig.elementId)).contentWindow.postMessage(
      msg,
      Blockly.UserConfig.domain
    );
  }

  /**
   * 收到game消息
   */
  onMessage(event: any) {
    if (event.origin === Blockly.UserConfig.domain) {
      console.log('收到' + event.origin + '消息：' + event.data);
    }
  }
}
