import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import {RouterModule} from "@angular/router";
import { ErrorPipe } from './pipes/error.pipe';
import { InputComponent } from './components/widgets/input/input.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NoPageFoundComponent,
    ErrorPipe,
    InputComponent,
  ],
  exports: [
    ErrorPipe,
    InputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
