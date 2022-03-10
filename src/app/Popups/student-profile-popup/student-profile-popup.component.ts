import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-student-profile-popup',
  templateUrl: './student-profile-popup.component.html',
  styleUrls: ['./student-profile-popup.component.css']
})
export class StudentProfilePopupComponent implements OnInit {

  constructor(private form: FormGroup) { }

  ngOnInit(): void {
  }

}
