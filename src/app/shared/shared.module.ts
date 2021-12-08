import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgPipe } from './pipes/error-msg.pipe';



@NgModule({
  declarations: [
    ErrorMsgPipe
  ],
  exports: [
    ErrorMsgPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
