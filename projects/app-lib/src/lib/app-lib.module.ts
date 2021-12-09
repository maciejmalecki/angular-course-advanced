import { NgModule } from '@angular/core';
import { AppLibComponent } from './app-lib.component';
import {InputComponent} from "./components/input/input.component";
import {ErrorMsgPipe} from "./pipes/error-msg.pipe";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    AppLibComponent,
    InputComponent,
    ErrorMsgPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppLibComponent,
    InputComponent,
    ErrorMsgPipe
  ]
})
export class AppLibModule { }

export {
  InputComponent,
  AppLibComponent,
  ErrorMsgPipe
}
