import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BooksState} from "./books.reducer";

const getBooksState = createFeatureSelector<BooksState>('books');

const getBooks = createSelector(getBooksState, (state: BooksState) => state.books);
const getSelectedBook = createSelector(getBooksState, (state: BooksState) => state.selectedBook);

export const BooksSelectors = {
  getBooks,
  getSelectedBook
}
