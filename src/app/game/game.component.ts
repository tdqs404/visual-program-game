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
   * 域名(必需)
   */
  @Input()
  gameDomain: string;

  /**
   * 无域名URL(必需)
   */
  @Input()
  gameUrl: string;

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
    this.gameElement.onload = () => {
      // todo unsuccess
      console.log(this.gameElement.contentWindow);
      this.gameElement.contentWindow.postMessage('主页面发送消息', this.gameDomain);
    };
  }
}
