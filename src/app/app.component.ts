import { Component } from '@angular/core';
import {from, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'synergy-academy-ui';
  public sidebarOpened = true;


}
