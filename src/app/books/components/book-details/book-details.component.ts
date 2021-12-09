import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @Input()
  book!: Book;

  @Output()
  bookSaved = new EventEmitter<Book>();

  @Output()
  editingCancelled = new EventEmitter();

  formGroup!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      title: new FormControl(this.book.title, [Validators.required, Validators.maxLength(30)]),
      author: new FormControl({ value: this.book.author, disabled: false }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl(this.book.description, [Validators.maxLength(1000)])
    });
  }

  saveBook(): void {
    this.bookSaved.emit({ ...this.book, ...this.formGroup.value });
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
