import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'assets/toolbox/toolbox.example.xml';
  }
}
