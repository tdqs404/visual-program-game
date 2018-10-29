import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlocksService } from './blocks.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  url = 'assets/toolbox/custom.example.xml';
  domain = 'http://172.16.75.246:3000';
  index = 'index.html';
  game = 'gameIframe';

  constructor(private http: HttpClient, private blocks: BlocksService) {
    blocks.elementId = this.game;
    blocks.domain = this.domain;
    blocks.blockInit();
  }

  ngOnInit() {}
}
