import {Component, ElementRef, Input, Optional, Self, ViewChild} from '@angular/core';
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

  @ViewChild("editor", { static: true })
  inputElement!: ElementRef;

  private onChange: (value: string | null) => void = _ => {
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
    if(this.inputElement) {
      this.inputElement.nativeElement.disabled = isDisabled;
    }
  }

  writeValue(value: string): void {
    if(this.inputElement) {
      this.inputElement.nativeElement.value = value;
    }
  }

  blur(): void {
    this.performOnTouched();
  }

  input(): void {
    this.performOnChange(this.inputElement.nativeElement.value);
    this.performOnTouched();
  }

  private performOnChange(value: string) {
    this.onChange(value);
    if(this.control.invalid) {
      this.getInput().classList.add("ng-invalid");
      this.getInput().classList.remove('ng-valid');
    }
    if(this.control.valid) {
      this.getInput().classList.add("ng-valid");
      this.getInput().classList.remove("ng-invalid");
    }
  }

  private performOnTouched(): void {
    this.getInput().classList.remove("ng-untouched");
    this.getInput().classList.add("ng-touched");
    this.onTouched();
  }

  private getInput(): HTMLInputElement {
    return this.inputElement.nativeElement as HTMLInputElement;
  }
}
