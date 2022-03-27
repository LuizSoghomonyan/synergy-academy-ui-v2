import { Component, OnInit, Inject } from '@angular/core';
import {
    MAT_DIALOG_DATA
} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-exam-results-popup',
  templateUrl: './exam-results-popup.component.html',
  styleUrls: ['./exam-results-popup.component.css']
})
export class ExamResultsPopupComponent implements OnInit {
    form: FormGroup
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dataservice: DataService
                ) {}

  ngOnInit(): void {
        console.log('AAAAAAAAARRRRRRRR', this.data.dataKey[0])
       this.form = new FormGroup({
           grade: new FormControl(''),
           comment: new FormControl(''),
           fullname: new FormControl('')
       })
  }

    onSubmit() {
        delete this.form.value["fullname"];
        this.form.value["courseexamstudentid"] = this.data.dataKey[0]["courseexamstudentid"]
        this.form.value["courseexamid"] = this.data.dataKey[0]["courseexamid"]
        //todo - after add from back
       // this.dataservice.updateResultsById(this.form.value).subscribe()
        console.log('Popup Submit', this.form.value)
    }
}
