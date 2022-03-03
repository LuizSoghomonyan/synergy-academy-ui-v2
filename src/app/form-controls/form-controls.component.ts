import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-form-controls',
    templateUrl: './form-controls.component.html',
    styleUrls: ['./form-controls.component.css']
})
export class FormControlsComponent implements OnInit,OnChanges {
    @Input() type: string
    @Input() value: string
    @Input() matlabel: string
    @Input() formCName: string
    @Input() form: FormGroup
    @Output() changedValue: EventEmitter<string> = new EventEmitter<string>()
    @Output() changedValueDate: EventEmitter<Date> = new EventEmitter<Date>()
    @Input() dateValue: string

    changedDate: Date

    onChanges(){
        console.log('onChanges')
        this.changedValue.emit(this.value)

    }

    constructor() {

    }

    ngOnInit(): void {
        // this.dateValue = '01-02-2022'
        console.log(this.dateValue)
        this.changedDate =  new Date(this.dateValue)
        console.log('this.currentDate',this.changedDate)
    }
    ngOnChanges(){
        this.changedValue.emit(this.value)
    }

    deleteDateValue() {
        // this.currentDate=new Date()
    }

    onChangesDate() {
        this.changedValueDate.emit(this.changedDate)
    }
}
