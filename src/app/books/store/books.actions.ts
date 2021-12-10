import {createAction, props} from "@ngrx/store";
import {Book} from "../model/book";

export enum BooksActionTypes {
  SetBooks = '[Books] Set books',
  SelectBook = '[Books] Select book',
  DeselectBook = '[Books] Deselect book',
  LoadBooks = '[Books] Load books',
  SaveBook = '[Books] Save book'
}

export const setBooksAction = createAction(BooksActionTypes.SetBooks, props<{ books: Book[] }>());
export const selectBookAction = createAction(BooksActionTypes.SelectBook, props<{ book: Book }>());
export const deselectBookAction = createAction(BooksActionTypes.DeselectBook);
export const loadBooksAction = createAction(BooksActionTypes.LoadBooks);
export const saveBookAction = createAction(BooksActionTypes.SaveBook, props<{ book: Book }>());
