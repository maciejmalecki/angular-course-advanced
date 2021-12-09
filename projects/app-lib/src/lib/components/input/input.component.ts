import {Component, ElementRef, Input, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  mandatory = false;

  @Input()
  title = '';

  @Input()
  inputId = '';

  @Input()
  name = '';

  @ViewChild("valueEditor", { static: true })
  inputElement!: ElementRef;

  private onChangeFn: (value: string) => void = (_) => {};
  private onTouchedFn: () => void = () => {};

  constructor(@Optional() @Self() public control: NgControl) {
    if(this.control) {
      this.control.valueAccessor = this;
    }
  }

  writeValue(value: string): void {
    this.inputElement.nativeElement.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.inputElement.nativeElement.disabled = isDisabled;
  }

  performOnTouched(): void {
    this.onTouchedFn();
  }

  performOnChanged() {
    this.onChangeFn(this.inputElement.nativeElement.value);
  }
}
