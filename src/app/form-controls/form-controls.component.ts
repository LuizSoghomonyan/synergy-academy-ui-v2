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
    @Input() dateValue: string //= '05/02/2015'
    @Input() numberValue: number
    @Input() selectvalue: string
    @Output() selectedvalueOutput: EventEmitter<string> = new EventEmitter<string>();
    changedDate: Date = new Date()


    classifierData$: Observable<string[]>
    datePipeString : string | null;
    constructor(private classifierService: ClassifierService,private datePipe: DatePipe) {

        // this.datePipeString = datePipe.transform(Date.now(),'dd/MM/YYYY');
        // // @ts-ignore
        // console.log(new Date(this.datePipeString,'yyyy-MM-dd'))
        // console.log(this.datePipeString);
    }

    ngOnInit(): void {
        console.log('ngOnInit')
        // @ts-ignore
        this.classifierData$ = this.classifierService.getClassifierData('university')
        if(this.type=='date'){
            this.changedDate = new Date(this.dateValue)
            console.log('changedDate', this.changedDate)
            console.log('dateValue', this.dateValue)
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
