import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {Observable, Subject} from "rxjs";
import {takeUntil, withLatestFrom} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {BooksState} from "../../store/books.reducer";
import {deselectBookAction, loadBooksAction, saveBookAction, selectBookAction,} from "../../store/books.actions";
import {BooksSelector} from "../../store/books.selectors";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent implements OnDestroy {

  readonly books$: Observable<Book[]>;
  readonly selectedBook$: Observable<Book | null>;

  private readonly unsubscribe = new Subject();
  private readonly selectBookClicked$ = new Subject<Book>();

  constructor(private readonly store: Store<BooksState>) {
    this.store.dispatch(loadBooksAction());
    this.books$ = this.store.pipe(select(BooksSelector.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));
    this.selectBookClicked$
      .pipe(
        takeUntil(this.unsubscribe),
        withLatestFrom(this.selectedBook$))
      .subscribe(
        ([clickedBook, selectedBook]) => {
          if (selectedBook && selectedBook.id === clickedBook.id) {
            this.store.dispatch(deselectBookAction());
          } else {
            this.store.dispatch(selectBookAction({book: clickedBook}));
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  selectBook(book: Book): void {
    this.selectBookClicked$.next(book);
  }

  cancelEditing(): void {
    this.store.dispatch(deselectBookAction());
  }

  saveBook(book: Book) {
    this.store.dispatch(saveBookAction({book}));
    this.store.dispatch(deselectBookAction());
  }
}
