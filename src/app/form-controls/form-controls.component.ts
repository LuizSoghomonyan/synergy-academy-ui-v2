import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

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
    @Input() numberValue: number

    changedDate: Date = new Date()
    datePipe: DatePipe

    constructor() {
        this.datePipe = new DatePipe(this.dateValue)
        // @ts-ignore
        this.changedDate = new Date(this.datePipe.transform(this.dateValue, 'yyyy-MM-dd'));
    }

    ngOnInit(): void {
        //this.dateValue = '01-02-2022'
        // console.log(this.dateValue)
        // console.log('2',this.datePipe)
        // console.log('this.currentDate',this.dateValue)
    }
    ngOnChanges(){
        console.log('ngOnChanges')
        this.changedValue.emit(this.value)
        // this.changedValue.emit(this.value)
    }

    deleteDateValue() {
        // @ts-ignore
        this.changedDate = null
    }

    onChangesDate() {
        this.changedValueDate.emit(this.changedDate)
    }
}
