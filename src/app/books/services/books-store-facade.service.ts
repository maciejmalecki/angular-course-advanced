import { Injectable } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {BooksState} from "../store/books.reducer";
import {Book} from "../model/book";
import {saveBookAction, selectBookAction} from "../store/books.actions";
import {BooksSelector} from "../store/books.selectors";

@Injectable()
export class BooksStoreFacade {

  constructor(private readonly store: Store<BooksState>) { }

  readonly books$ = this.store.pipe(select(BooksSelector.getBooks));
  readonly selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));

  saveBook(book: Book): void {
    this.store.dispatch(saveBookAction({ book }));
  }

  selectBook(book: Book): void {
    this.store.dispatch(selectBookAction({ book }));
  }
}
