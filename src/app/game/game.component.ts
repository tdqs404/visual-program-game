import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {
  private gameElement: any;

  /**
   * 域名(默认值'http://172.16.75.246:3000')
   */
  @Input()
  gameDomain = 'http://172.16.75.246:3000';

  /**
   * 无域名URL(默认值'index.html')
   */
  @Input()
  gameUrl = 'index.html';

  /**
   * 子IframeId (多个必需)
   */
  @Input()
  gameId = 'gameIframe';

  constructor(private sanitizer: DomSanitizer) {
    console.log(this);
  }

  ngOnInit() {}

  async ngAfterViewInit() {
    this.gameElement = document.getElementById(this.gameId);
    this.gameElement.onreadystatechange = () => {
      // todo unsuccess
      this.gameElement.contentWindow.postMessage('主页面发送消息', this.gameDomain);
    };
  }
}