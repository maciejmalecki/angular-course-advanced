import { NgModule } from '@angular/core';
import { WidgetsComponent } from './widgets.component';
import {InputComponent} from "./components/input/input.component";
import {ErrorMsgPipe} from "./pipes/error-msg.pipe";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    WidgetsComponent,
    InputComponent,
    ErrorMsgPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WidgetsComponent,
    InputComponent,
    ErrorMsgPipe
  ]
})
export class WidgetsModule { }
