import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import Blockly.js
declare var Blockly: any;
declare var MSG: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  private blocklyArea: HTMLElement;
  private blocklyDiv: HTMLElement;
  private workspace: any;

  /**
   * (必需)工具箱的url，动态加载xml文件
   */
  @Input()
  toolboxUrl: string;

  /**
   * 语言(默认值'zh-hans')
   */
  @Input()
  language = 'zh-hans';

  /**
   * 展示标签的ID (多个必需不同)
   */
  @Input()
  areaId = 'blocklyArea';

  /**
   * blockly标签的ID (多个必需不同)
   */
  @Input()
  divId = 'blocklyDiv';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    document.write('<script src="assets/msg/' + this.language + '.js"></script>\n');
  }

  /**
   * 动态加载完成标签ID后，同步初始化
   */
  async ngAfterViewInit() {
    this.blocklyArea = document.getElementById(this.areaId);
    this.styleInit();
    this.blocklyDiv = document.getElementById(this.divId);
    await this.http.get(this.toolboxUrl, { responseType: 'text' }).subscribe((toolboxText: string) => {
      toolboxText = toolboxText.replace(/{(\w+)}/g, function(m, p1) {
        return MSG[p1];
      });
      this.workspace = Blockly.inject(this.divId, {
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
        Blockly.svgResize(this.workspace);
      };
      window.addEventListener('resize', onresize, false);
      onresize();
      Blockly.svgResize(this.workspace);
      Blockly.UserConfig.workspace = this.workspace;
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

}
