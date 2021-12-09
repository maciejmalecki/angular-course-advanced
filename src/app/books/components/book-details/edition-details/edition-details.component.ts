import {Component} from '@angular/core';
import {EditionDetailsForm} from "./edition-details.form";

@Component({
  selector: 'app-edition-details',
  templateUrl: './edition-details.component.html',
  styleUrls: ['./edition-details.component.scss']
})
export class EditionDetailsComponent {

  readonly form: EditionDetailsForm = new EditionDetailsForm();

  constructor() {
  }
}
