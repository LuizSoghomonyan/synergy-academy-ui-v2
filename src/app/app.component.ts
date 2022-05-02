import {Component, OnInit} from '@angular/core';
import {from, map} from "rxjs";
import {DataService} from "./services/data.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    title = 'synergy-academy-ui';
    public sidebarOpened = true;

    constructor() {
        console.error = () => {}
        // console.warn = () => {}
    }

}
