import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

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
}
