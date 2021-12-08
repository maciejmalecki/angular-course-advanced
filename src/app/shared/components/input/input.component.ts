import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  innerValue = '';

  @Input()
  mandatory = false;

  @Input()
  title = '';

  @Input()
  inputId = '';

  @Input()
  name = '';

  disabled = false;

  private onChangeFn: (value: string) => void = (_) => {};
  private onTouchedFn: () => void = () => {};

  constructor() { }

  writeValue(value: string): void {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  performOnTouched(): void {
    this.onTouchedFn();
  }

  performOnChanged(value: string) {
    this.innerValue = value;
    this.onChangeFn(value);
  }
}
