import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-reset-popup',
    templateUrl: './reset-popup.component.html',
    styleUrls: ['./reset-popup.component.css']
})
export class ResetPopupComponent implements OnInit, OnChanges {
    @Output() isResetOutput: EventEmitter<boolean> = new EventEmitter<boolean>()

    constructor() {
    }

    isReset: boolean = false

    ngOnInit(): void {
        console.log('ResetPopupComponent - ngOnInit')
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('ResetPopupComponent - ngOnChanges')
    }

    notReset() {
        this.isReset = false
        this.isResetOutput.emit(this.isReset)
    }

    Reset(){
        this.isReset = true
    }
}
