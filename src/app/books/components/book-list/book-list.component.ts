import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../services/books.service";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent implements OnDestroy{

  books$: Observable<Book[]>;
  selectedBook: Book | null = null;

  private readonly unsubscribe = new Subject();

  constructor(private readonly bookService: BooksService) {
    this.books$ = this.bookService.getBooks();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectBook(book: Book): void {
    if (this.selectedBook?.id === book.id) {
      this.selectedBook = null;
    } else {
      this.selectedBook = book;
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }

  saveBook(book: Book) {
    this.bookService.saveBook(book).pipe(takeUntil(this.unsubscribe)).subscribe(_ => {
      this.selectedBook = null;
      this.books$ = this.bookService.getBooks();
    });
  }
}
