import { Component, AfterViewInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FuncService } from '../share/func.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit {
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

  constructor(private sanitizer: DomSanitizer, private func: FuncService) {
    console.log(this);
  }

  ngAfterViewInit() {
    window.addEventListener('message', this.func.onMessage, false);
  }
}
