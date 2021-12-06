import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import {RouterModule} from "@angular/router";
import { ErrorPipe } from './pipes/error.pipe';



@NgModule({
  declarations: [
    NoPageFoundComponent,
    ErrorPipe,
  ],
  exports: [
    ErrorPipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
