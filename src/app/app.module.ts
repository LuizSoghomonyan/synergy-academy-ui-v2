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
import {StudentService} from "./services/student.service";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSidenavModule,
    FormsModule,
    MatTableModule,
    RouterModule
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
