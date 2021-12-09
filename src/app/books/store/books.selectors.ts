import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BOOKS_FEATURE, BooksState} from "./books.reducer";

const getBooksState = createFeatureSelector<BooksState>(BOOKS_FEATURE);

const getBooks = createSelector(getBooksState, (state: BooksState) => state.books);
const getSelectedBook = createSelector(getBooksState, (state: BooksState) => state.selectedBook);

export const BooksSelector = {
  getBooks,
  getSelectedBook
};
