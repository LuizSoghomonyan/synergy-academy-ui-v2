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
        FormControlsComponent

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
        DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
