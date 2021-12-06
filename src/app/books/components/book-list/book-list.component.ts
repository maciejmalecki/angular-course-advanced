import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];

  selectedBook: Book | undefined = undefined;

  constructor(private readonly bookService: BookService) {
    this.books = bookService.getBooks();
  }

  ngOnInit(): void {
  }

  selectBook(id: number | undefined): void {
    if (id) {
      const loadedBook = this.bookService.getBook(id);
      if (loadedBook) {
        this.selectedBook = { ...loadedBook };
      } else {
        this.selectedBook = undefined;
      }
    }
  }

  saveBook(): void {
    if (this.selectedBook) {
      this.bookService.saveBook(this.selectedBook);
      this.selectedBook = undefined;
      this.books = this.bookService.getBooks();
    }
  }

  cancel() {
    this.selectedBook = undefined;
  }
}
