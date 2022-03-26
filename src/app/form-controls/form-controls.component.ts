import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ClassifierService} from "../services/classifier.service";
import {first, from, map, mergeMap, Observable} from "rxjs";
export interface Classifer{
    id:number,
    name:string
}

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD-MM-YYYY',
    },
    display: {
        dateInput: 'MMM DD, YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};


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
    @Input() selectvalue: string
    @Input() classifierName: string
    @Output() selectedvalueOutput: EventEmitter<string> = new EventEmitter<string>();
    changedDate: Date = new Date()


    classifierData$: Observable<string[]>
    datePipeString : string | null;
    constructor(private classifierService: ClassifierService,public datepipe: DatePipe) {
        this.datepipe = new DatePipe('en-US')
        // this.datePipeString = datePipe.transform(Date.now(),'dd/MM/YYYY');
        // // @ts-ignore
        // console.log(new Date(this.datePipeString,'yyyy-MM-dd'))
        // console.log(this.datePipeString);
    }

    ngOnInit(): void {
        console.log('ngOnInit')
        // @ts-ignore
        this.classifierData$ = this.classifierService.getClassifierData(this.classifierName)
        if(this.type=='date'){
            let str: string = <string>this.datepipe.transform(this.changedDate, 'yyyy/MM/dd');
            this.changedDate = new Date(str)
            // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
            //     this.datepipe.transform(this.changedDate, 'yyyy/MM/dd')) //2022-03-10
            // console.log('changedDate', this.changedDate)
            // console.log('dateValue', this.dateValue)
        }

    }


    ngOnChanges(){ //TODO
        console.log('ngOnChanges')

        this.changedValue.emit(this.value)
        // console.log('emit')
        // console.log(this.changedDate)
        this.selectedvalueOutput.emit(this.selectvalue)
        // this.selectedvalueOutput.emit(this.selectedvalue)
        // this.changedValue.emit(this.value)

    }


    deleteDateValue() {
        // @ts-ignore
        this.changedDate = null
    }

    onChangesDate() {
        console.log('onChangesDate')
        this.changedValueDate.emit(this.changedDate)
    }


}
