import { Component, OnInit } from '@angular/core';
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

  constructor(private blocks: BlocksService) {
    blocks.blockInit(this.game, this.domain);
  }

  ngOnInit() {}

  runJS() {
    this.blocks.runJS();
  }

  discard() {
    this.blocks.discard();
  }
}
