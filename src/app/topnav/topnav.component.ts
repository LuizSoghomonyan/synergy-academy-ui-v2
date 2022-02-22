import {Component, EventEmitter, OnInit} from '@angular/core';
import {TestComponent} from "../test/test.component";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  sidebarOpened = true;

  constructor() { }

  ngOnInit(): void {

  }


}
