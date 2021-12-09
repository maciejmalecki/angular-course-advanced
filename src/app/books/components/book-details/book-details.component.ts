import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../model/book";
import {EditionDetailsComponent} from "./edition-details/edition-details.component";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  book!: Book;

  // alternative method of hijacking input update
  // _book!: Book;
  //
  // @Input()
  // set book(value: Book) {
  //   this._book = value;
  //   this.formGroup.enable();
  //   this.formGroup.patchValue({
  //     title: this.book.title,
  //     author: this.book.author,
  //     description: this.book.description
  //   });
  // }
  //
  // get book() {
  //   return this._book;
  // }

  @Output()
  bookSaved = new EventEmitter<Book>();

  @Output()
  editingCancelled = new EventEmitter();

  _editionDetailsComponent!: EditionDetailsComponent;

  @ViewChild(EditionDetailsComponent, { static: true })
  set editionDetailsComponent(component: EditionDetailsComponent) {
    this._editionDetailsComponent = component;
    this.formGroup.addControl('edition', component.form.formGroup);
  }

  readonly formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.maxLength(1000)]),
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    // alternative
    // if(!this.formGroup.contains('edition')) {
    //   this.formGroup.addControl('edition', this.editionDetailsComponent.formGroup);
    // }

    if(changes.book) {
      this.formGroup.enable();
      this.formGroup.patchValue({
        title: this.book.title,
        author: this.book.author,
        description: this.book.description,
        edition: {
          publisher: this.book.edition.publisher,
          publishYear: this.book.edition.publishYear,
          editionNumber: this.book.edition.editionNumber
        }
      });
    }
  }

  saveBook(): void {
      const edition = this._editionDetailsComponent.form.extract();
      this.book = {...this.book, ...{...this.formGroup.value, edition}};
      this.bookSaved.emit(this.book);
  }

  disableEnable(): void {
    const fc = this.formGroup;
    if(fc.disabled) {
      fc.enable();
    } else {
      fc.disable();
    }
  }

  cancelEditing(): void {
    this.editingCancelled.emit();
  }
}
