import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { SafePipe } from './safe.pipe';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [AppComponent, EditorComponent, SafePipe, GameComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
