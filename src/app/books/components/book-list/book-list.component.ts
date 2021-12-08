import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {errorToMessage} from "../../../shared/util/error-util";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent {

  books: Book[];
  selectedBook: Book | null = null;

  readonly formGroup: FormGroup;

  constructor(private readonly bookService: BooksService) {
    this.books = this.bookService.getBooks();
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.maxLength(1000)])
    });
  }

  selectBook(book: Book): void {
    if (this.selectedBook?.id === book.id) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
      this.formGroup.enable();
      this.formGroup.reset({
        author: this.selectedBook.author,
        title: this.selectedBook.title,
        description: this.selectedBook.description
      });
    }
  }

  saveBook(): void {
    if(this.selectedBook) {
      this.bookService.saveBook({ ...this.selectedBook, ...this.formGroup.value });
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }

  disableEnable(): void {
    const fc = this.formGroup;
    if(fc.disabled) {
      fc.enable();
    } else {
      fc.disable();
    }
  }

  dumpErrors(validationErrors: ValidationErrors | null): string {
    if(validationErrors) {
      const errorKeys = Object.keys(validationErrors);
      return errorKeys.map(errorKey => errorToMessage(errorKey, validationErrors[errorKey])).join(' ');
    } else {
      return '';
    }
  }
}
