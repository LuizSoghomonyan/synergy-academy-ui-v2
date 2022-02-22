import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import { TestComponent } from './test/test.component';
import { TableComponent } from './table/table.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    TestComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSidenavModule,
    FormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
