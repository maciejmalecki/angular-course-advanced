import { BookListComponent } from './book-list.component';
import {BookService} from "../../services/book.service";

describe('BookListComponent', () => {
  describe("[class]", () => {
    let component: BookListComponent;
    let bookService: BookService;

    beforeEach(() => {
      bookService = new BookService();
      component = new BookListComponent(bookService);
    });

    it("fetches books during construction", () => {
      expect(component.books).toHaveSize(3);
    });

    it("allows selecting book by id", () => {
      // when
      const book = component.books[1];
      component.selectBook(book.id);
      // then
      expect(component.selectedBook).toEqual(book);
    });

    it("cancel deselect previously selected book", () => {
      // given
      const book = component.books[0];
      component.selectBook(book.id);
      expect(component.selectedBook).toBeTruthy();
      // when
      component.cancel();
      // then
      expect(component.selectedBook).toBeFalsy();
    });
  });

  describe("[DOM]", () => {

  });
});
