import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { SafePipe } from './safe.pipe';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [AppComponent, EditorComponent, SafePipe, GameComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
