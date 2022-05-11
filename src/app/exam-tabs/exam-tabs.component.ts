import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-exam-tabs',
    templateUrl: './exam-tabs.component.html',
    styleUrls: ['./exam-tabs.component.css']
})
export class ExamTabsComponent implements OnInit {
    classmarkertestid: string
    url: string
    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {

        // return this.route.url.subscribe(x=>console.log(x[0].path))
    }

    setClassMarkerTest($event: any) {
        this.classmarkertestid = $event
        console.log('EVENT', $event)
    }
}
