import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import { TestComponent } from './test/test.component';
import { TableComponent } from './table/table.component';
import {MatTableModule} from "@angular/material/table";
import {DataService} from "./services/data.service";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { TitleComponent } from './title/title.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { AllstudentsComponent } from './allstudents/allstudents.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TableComponent,
    TitleComponent,
    AllstudentsComponent
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
        MatButtonToggleModule
    ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
