import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-exam-students-result',
  templateUrl: './exam-students-result.component.html',
  styleUrls: ['./exam-students-result.component.css']
})
export class ExamStudentsResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    viewProgressBar: boolean = false;
    refresh() {
        this.viewProgressBar = true;
        //call to back
        setTimeout(() => {
            this.viewProgressBar = false
        }, 2500)

        //todo call for
    }
}
