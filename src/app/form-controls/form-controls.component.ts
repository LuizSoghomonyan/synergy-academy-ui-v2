import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AbstractControl, Form, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {ClassifierService} from "../services/classifier.service";
import {first, from, map, mergeMap, Observable} from "rxjs";
export interface Classifer{
    id:number,
    name:string
}
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
    @Output() selectedvalueOutput: EventEmitter<string> = new EventEmitter<string>();
    changedDate: Date = new Date()
    datePipe: DatePipe

    classifierData$: Observable<string[]>

    constructor(private classifierService: ClassifierService) {
        this.datePipe = new DatePipe(this.dateValue)
        // @ts-ignore
        this.changedDate = new Date(this.datePipe.transform(this.dateValue, 'yyyy-MM-dd'));
    }

    ngOnInit(): void {
        // this.selectvalues$ = this.classifierService.getClassifierData('university')
        // this.selectvalues$.pipe(
        //     // @ts-ignore
        //     mergeMap(x => from(x)),
        //     map(classifierItem => {
        //         // @ts-ignore
        //         this.universites.push(classifierItem['name'])
        //     }).subscribe()
        // @ts-ignore
        this.classifierData$ = this.classifierService.getClassifierData('university')

    }
    ngOnChanges(){ //TODO
        console.log('ngOnChanges')
        this.changedValue.emit(this.value)
        console.log('emit')
        this.selectedvalueOutput.emit(this.selectvalue)
        // this.selectedvalueOutput.emit(this.selectedvalue)
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
