import { Pipe, PipeTransform } from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {errorToMessage} from "../util/error-util";

@Pipe({
  name: 'errorMsg',
  pure: true
})
export class ErrorMsgPipe implements PipeTransform {

  transform(validationErrors: ValidationErrors | null, fieldName?: string): string {
    if(validationErrors) {
      const errorKeys = Object.keys(validationErrors);
      return errorKeys.map(errorKey => errorToMessage(errorKey, validationErrors[errorKey], fieldName)).join(' ');
    } else {
      return '';
    }
  }

}
