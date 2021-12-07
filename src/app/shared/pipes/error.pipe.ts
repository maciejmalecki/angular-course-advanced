import {Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

const translate = (errorKey: string, errorData: any) => {
  switch (errorKey) {
    case 'maxlength':
      return `Maximum length is exceeded. Current length is ${errorData.actualLength} but maximum allowed is ${errorData.requiredLength}.`;
    case 'required':
      return "The value is required.";
  }
  return "";
}

@Pipe({
  name: 'error',
  pure: true
})
export class ErrorPipe implements PipeTransform {

  transform(value: ValidationErrors | null | undefined): string[] {
    if (value) {
      const keys = Object.keys(value);
      return keys.map(key => translate(key, value[key]));
    } else {
      return [];
    }
  }

}
