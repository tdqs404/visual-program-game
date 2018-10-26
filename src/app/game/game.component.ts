import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public gameUrl: string;

  constructor(private sanitizer: DomSanitizer) {
    this.gameUrl = 'http://172.16.75.246:3000/index.html';
  }

  ngOnInit() {}
}
