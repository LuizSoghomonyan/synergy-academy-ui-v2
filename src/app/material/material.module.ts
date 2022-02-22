import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from '@angular/material/toolbar';


const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatToolbarModule

];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
