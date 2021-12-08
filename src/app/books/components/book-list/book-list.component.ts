import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent {

  books: Book[];

  selectedBook: Book | null = null;

  constructor(private readonly bookService: BooksService) {
    this.books = this.bookService.getBooks();
  }

  selectBook(book: Book): void {
    if (this.selectedBook === book) {
      this.selectedBook = null;
    } else {
      this.selectedBook = {...book};
    }
  }

  saveBook(): void {
    if(this.selectedBook) {
      this.bookService.saveBook(this.selectedBook);
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }
}
