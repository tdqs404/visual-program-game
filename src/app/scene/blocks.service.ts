import { Injectable } from '@angular/core';
import * as _ from 'lodash';
// import Blockly.js
declare var Blockly: any;

@Injectable({
  providedIn: 'root'
})
export class BlocksService {
  constructor() {}

  blocksJson = {
    block_up: {
      type: 'block_up',
      message0: '向上',
      previousStatement: null,
      nextStatement: null,
      colour: 180,
      tooltip: '',
      helpUrl: 'http://www.example.com/'
    },
    block_down: {
      type: 'block_down',
      message0: '向下',
      previousStatement: null,
      nextStatement: null,
      colour: 180,
      tooltip: '',
      helpUrl: 'http://www.example.com/'
    },
    block_left: {
      type: 'block_left',
      message0: '向左',
      previousStatement: null,
      nextStatement: null,
      colour: 180,
      tooltip: '',
      helpUrl: 'http://www.example.com/'
    },
    block_right: {
      type: 'block_right',
      message0: '向右',
      previousStatement: null,
      nextStatement: null,
      colour: 180,
      tooltip: '',
      helpUrl: 'http://www.example.com/'
    }
  };

  blocksJS = {
    block_up: (block: any) => {
      return 'Blockly.func.send("up");\n';
    },
    block_down: (block: any) => {
      return 'Blockly.func.send("down");\n';
    },
    block_left: (block: any) => {
      return 'Blockly.func.send("left");\n';
    },
    block_right: (block: any) => {
      return 'Blockly.func.send("right");\n';
    }
  };

  blockInit(elementId: string, domain: string) {
    _.forEach(this.blocksJson, function(value, key) {
      Blockly.Blocks[key] = {
        init: function() {
          this.jsonInit(value);
        }
      };
    });
    _.forEach(this.blocksJS, function(value, key) {
      Blockly.JavaScript[key] = value;
    });
    window.addEventListener('message', this.onMessage, false);
    Blockly.func = {
      send: this.send
    };
    Blockly.UserConfig = {
      elementId: elementId,
      domain: domain
    };
  }

  send(msg: string) {
    (<any>document.getElementById(Blockly.UserConfig.elementId)).contentWindow.postMessage(
      msg,
      Blockly.UserConfig.domain
    );
  }

  onMessage(event: any) {
    console.log('收到' + event.origin + '消息：' + event.data);
  }
}
