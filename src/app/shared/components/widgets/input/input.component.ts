import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputComponent,
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  title: string = '';

  @Input()
  inputId: string = '';

  @Input()
  name: string | undefined;

  internalValue: string = '';
  disabled = false;

  private onChange: (value: string) => void = _ => {
  };
  private onTouched: () => void = () => {
  };

  constructor() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.internalValue = value;
  }

  blur(): void {
    this.onTouched();
  }

  input(): void {
    this.onChange(this.internalValue);
    this.onTouched();
  }
}
