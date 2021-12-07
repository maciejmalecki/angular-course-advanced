import {Component, Input, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
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

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
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
