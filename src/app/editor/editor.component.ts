import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import Blockly.js
declare var Blockly: any;
declare var MSG: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  private blocklyArea: HTMLElement;
  private blocklyDiv: HTMLElement;
  private workSpace: any;
  /**
   * (必需)工具箱的url，动态加载xml文件
   */
  @Input()
  toolboxUrl: string;
  /**
   * (必需)展示标签的ID
   */
  @Input()
  areaId: string;
  /**
   * 语言(默认值'zh-hans')
   */
  @Input()
  language = 'zh-hans';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    document.write('<script src="assets/msg/' + this.language + '.js"></script>\n');
    this.blocklyArea = document.getElementById('blocklyArea');
    this.styleInit();
    this.blocklyDiv = document.getElementById('blocklyDiv');
    await this.http.get(this.toolboxUrl, { responseType: 'text' }).subscribe((toolboxText: string) => {
      toolboxText = toolboxText.replace(/{(\w+)}/g, function(m, p1) {
        return MSG[p1];
      });
      this.workSpace = Blockly.inject('blocklyDiv', {
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        media: 'assets/media/',
        toolbox: Blockly.Xml.textToDom(toolboxText),
        zoom: {
          controls: true,
          wheel: true
        }
      });
      const onresize = () => {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        let element: any = this.blocklyArea;
        let x = 0;
        let y = 0;
        do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        this.blocklyDiv.style.left = x + 'px';
        this.blocklyDiv.style.top = y + 'px';
        this.blocklyDiv.style.width = this.blocklyArea.offsetWidth + 'px';
        this.blocklyDiv.style.height = this.blocklyArea.offsetHeight + 'px';
        Blockly.svgResize(this.workSpace);
      };
      window.addEventListener('resize', onresize, false);
      onresize();
      Blockly.svgResize(this.workSpace);
    });
  }

  /**
   * 组件style初始化
   * 传递组件的style给blocklyArea
   */
  styleInit() {
    const parentStyle = this.blocklyArea.parentElement.style;
    const styles = ['width', 'height'];
    styles.forEach(element => {
      this.blocklyArea.style[element] = parentStyle[element];
    });
  }

  /**
   * Execute the user's code.
   * Just a quick and dirty eval.  Catch infinite loops.
   */
  runJS() {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    let timeouts = 0;
    const checkTimeout = function() {
      if (timeouts++ > 1000000) {
        throw MSG['timeout'];
      }
    };
    const code = Blockly.JavaScript.workSpaceToCode(this.workSpace);
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    try {
      // tslint:disable-next-line:no-eval
      eval(code);
    } catch (e) {
      alert(MSG['badCode'].replace('%1', e));
    }
  }
}
