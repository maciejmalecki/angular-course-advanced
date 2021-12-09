import {Book} from "../model/book";

export interface BooksState {
  books: Book[],
  selectedBook: Book | null
}

export const initialBooksState: BooksState = {
  books: [],
  selectedBook: null
};


