import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {BooksState} from "../../store/books.reducer";
import {deselectBookAction, loadBooksAction, saveBookAction, selectBookAction} from "../../store/book.actions";
import {BooksSelectors} from "../../store/books.selectors";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent {

  books$: Observable<Book[]>;
  selectedBook$: Observable<Book | null>;
  selectedBookId: number | undefined = undefined;

  readonly formGroup: FormGroup;

  constructor(private readonly store: Store<BooksState>) {
    this.store.dispatch(loadBooksAction());
    this.books$ = this.store.pipe(select(BooksSelectors.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelectors.getSelectedBook));
    this.selectedBook$.subscribe(book => {
      if (book) {
        this.selectedBookId = book.id;
        this.formGroup.enable();
        this.formGroup.reset({
          author: book.author,
          title: book.title,
          description: book.description
        });
      } else {
        this.selectedBookId = undefined;
      }
    });

    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl({
        value: '',
        disabled: false
      }, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      description: new FormControl('', [Validators.maxLength(1000)])
    });
  }

  selectBook(book: Book): void {
    if (this.selectedBookId) {
      this.store.dispatch(deselectBookAction());
    } else {
      this.store.dispatch(selectBookAction({book}));
    }
  }

  saveBook(): void {
    if (this.selectedBookId) {
      this.store.dispatch(saveBookAction({book: {id: this.selectedBookId, ...this.formGroup.value}}));
      this.store.dispatch(deselectBookAction());
    }
  }

  cancelEditing(): void {
    this.store.dispatch(deselectBookAction());
  }

  disableEnable(): void {
    const fc = this.formGroup;
    if (fc.disabled) {
      fc.enable();
    } else {
      fc.disable();
    }
  }
}
