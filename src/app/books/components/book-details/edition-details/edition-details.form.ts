import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Edition} from "../../../model/edition";

export class EditionDetailsForm {
  readonly formGroup: FormGroup = new FormGroup({
    publisher: new FormControl('', []),
    publishYear: new FormControl('', [Validators.max(3000), Validators.min(1900)]),
    editionNumber: new FormControl('', [Validators.max(100), Validators.min(1)])
  });

  feedWith(edition: Edition): void {
    this.formGroup.patchValue(edition);
  }

  extract(): Edition {
    return {
      publisher: this.formGroup.controls.publisher.value,
      publishYear: Number.parseInt(this.formGroup.controls.publishYear.value, 10),
      editionNumber: Number.parseInt(this.formGroup.controls.editionNumber.value, 10)
    }
  }
}
