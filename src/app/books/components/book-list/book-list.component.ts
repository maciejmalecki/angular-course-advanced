import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";
import {FormControl, FormGroup} from "@angular/forms";

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
      title: new FormControl(),
      author: new FormControl(),
      description: new FormControl()
    });
  }

  selectBook(book: Book): void {
    if (this.selectedBook?.id === book.id) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
      this.formGroup.setValue({
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
}
