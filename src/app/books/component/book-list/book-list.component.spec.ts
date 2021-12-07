import { BookListComponent } from './book-list.component';
import {BooksService} from "../../service/books.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('BookListComponent', () => {

  let component: BookListComponent;

  describe('[class]', () => {

    let bookService: BooksService;

    beforeEach(() => {
      bookService = new BooksService();
      component = new BookListComponent(bookService);
    });

    it('has no selected book initially', () => {
      expect(component.selectedBook).toBeNull();
    });

    it('has some books initially', () => {
      expect(component.books).toHaveSize(3);
    });

    it('allows to select a book', () => {
      // given
      const toBeSelected = component.books[1];
      // when
      component.selectBook(toBeSelected);
      // then
      expect(component.selectedBook).toEqual(toBeSelected);
    });

    it('allows to cancel the editing', () => {
      // given
      const toBeSelected = component.books[1];
      component.selectBook(toBeSelected);
      expect(component.selectedBook).toEqual(toBeSelected);
      // when
      component.cancelEditing();
      // then
      expect(component.selectedBook).toBeNull();
    });
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        providers: [BooksService]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('can be created', () => {
      expect(component).toBeTruthy();
    });

    it('renders a list of books', () => {
      const liElements = nativeElement.querySelectorAll("li.list-group-item");
      expect(liElements.length).toBe(3);
    });
  });
});
