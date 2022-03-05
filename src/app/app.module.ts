import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {TestComponent} from './test/test.component';
import {TableComponent} from './table/table.component';
import {MatTableModule} from "@angular/material/table";
import {DataService} from "./services/data.service";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {TitleComponent} from './title/title.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {AllstudentsComponent} from './allstudents/allstudents.component';
import {AppRoutingModule} from "./app.routing.module";
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {AllcoursesComponent} from './allcourses/allcourses.component';
import {StudentProfileComponent} from './student-profile/student-profile.component';
import {TabComponent} from './tab/tab.component';
import {MatInputModule} from "@angular/material/input";
import { FormControlsComponent } from './form-controls/form-controls.component';
import {DatePipe} from "@angular/common";
import { StudentProfilePopupComponent } from './Popups/student-profile-popup/student-profile-popup.component';
import { DataSaveSuccessfulPopupComponent } from './Popups/data-save-successful-popup/data-save-successful-popup.component';
import { ResetPopupComponent } from './Popups/reset-popup/reset-popup.component';
import { SelectComponent } from './select/select.component';


@NgModule({
    declarations: [
        AppComponent,
        TestComponent,
        TableComponent,
        TitleComponent,
        AllstudentsComponent,
        PagenotfoundComponent,
        AllcoursesComponent,
        StudentProfileComponent,
        TabComponent,
        FormControlsComponent,
        StudentProfilePopupComponent,
        DataSaveSuccessfulPopupComponent,
        ResetPopupComponent,
        SelectComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatSidenavModule,
        FormsModule,
        MatTableModule,
        RouterModule,
        HttpClientModule,
        MatButtonToggleModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    providers: [
        DataService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
