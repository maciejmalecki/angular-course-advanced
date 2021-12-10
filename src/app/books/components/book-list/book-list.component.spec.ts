import {BookListComponent} from './book-list.component';
import {BooksService} from "../../services/books.service";
import {ComponentFixture, TestBed, tick} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {of} from "rxjs";
import {Book} from "../../model/book";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {BooksState, initialBooksState} from "../../store/books.reducer";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {EditionDetailsComponent} from "../book-details/edition-details/edition-details.component";
import {BooksSelector} from "../../store/books.selectors";
import {Injector} from "@angular/core";

describe('BookListComponent', () => {

  let component: BookListComponent;
  let bookServiceMock: any;
  let storeMock: MockStore<BooksState>;

  // redux
  const selectBook = (book: Book | null) => {
    storeMock.overrideSelector(BooksSelector.getSelectedBook, book);
    storeMock.refreshState();
  };

  const books: () => Book[] = () => [{
    id: 1,
    title: 'Solaris',
    author: 'Stanisław Lem',
    description: 'Solaris chronicles the ultimate futility of attempted communications with the extraterrestrial life inhabiting a distant alien planet named Solaris. The planet is almost completely covered with an ocean of gel that is revealed to be a single, planet-encompassing entity. Terran scientists conjecture it is a living and a sentient being, and attempt to communicate with it.',
    edition: {
      publisher: 'Amazon1',
      publishYear: 1991,
      editionNumber: 2
    }
  }, {
    id: 2,
    title: '2001: A Space Odyssey',
    author: 'Aurthur C. Clarke',
    description: 'A mysterious alien civilization uses a tool with the appearance of a large crystalline monolith to investigate worlds across the galaxy and, if possible, to encourage the development of intelligent life. The book shows one such monolith appearing in prehistoric Africa, 3 million years ago (in the movie, 4 mya), where it inspires a starving group of hominids to develop tools. The hominids use their tools to kill animals and eat meat, ending their starvation. They then use the tools to kill a leopard preying on them; the next day, the main ape character, Moon-Watcher, uses a club to kill the leader of a rival tribe. The book suggests that the monolith was instrumental in awakening intelligence.',
    edition: {
      publisher: 'Amazon2',
      publishYear: 1992,
      editionNumber: 3
    }
  }, {
    id: 3,
    title: 'Ubik',
    author: 'Phillip K. Dick',
    description: 'By the year 1992, humanity has colonized the Moon and psychic powers are common. The protagonist, Joe Chip, is a debt-ridden technician working for Runciter Associates, a "prudence organization" employing "inertials"—people with the ability to negate the powers of telepaths and "precogs"—to enforce the privacy of clients. The company is run by Glen Runciter, assisted by his deceased wife Ella who is kept in a state of "half-life", a form of cryonic suspension that allows the deceased limited consciousness and ability to communicate. While consulting with Ella, Runciter discovers that her consciousness is being invaded by another half-lifer named Jory Miller.',
    edition: {
      publisher: 'Amazon3',
      publishYear: 1993,
      editionNumber: 4
    }
  }];

  beforeEach(() => {
    bookServiceMock = {
      getBooks: () => of(books()),
      saveBook: (book: Book) => of(book)
    };
  });

  describe('[class]', () => {

    beforeEach(() => {
      const injector = Injector.create({
        providers: [
          provideMockStore({
            initialState: initialBooksState, selectors: [
              {
                selector: BooksSelector.getBooks,
                value: books()
              },
              {
                selector: BooksSelector.getSelectedBook,
                value: null
              }
            ]
          })
        ]
      });
      storeMock = injector.get(MockStore);
      component = new BookListComponent(bookServiceMock, storeMock);
    });

    it('has no selected book initially', () => {
      expect(component.selectedBookId).toBeUndefined();
    });

    it('allows to select a book', () => {
      // given
      const toBeSelected = books()[1];
      // when
      component.selectBook(toBeSelected);
      selectBook(toBeSelected);
      // then
      expect(component.selectedBookId).toEqual(toBeSelected.id);
    });

    it('allows to cancel the editing', () => {
      // given
      const toBeSelected = books()[1];
      component.selectBook(toBeSelected);
      selectBook(toBeSelected);
      expect(component.selectedBookId).toEqual(toBeSelected.id);
      // when
      component.cancelEditing();
      selectBook(null);
      // then
      expect(component.selectedBookId).toBeUndefined();
    });
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;
    let booksService: BooksService;

    // nouns
    const bookList = () => nativeElement.querySelectorAll("li.list-group-item");
    const bookElementAt = (position: number) => bookList().item(position) as HTMLLIElement;
    const editor = () => nativeElement.querySelector("#editor");
    const cancelButton = () => nativeElement.querySelector("#cancel-button") as HTMLButtonElement;
    const saveButton = () => nativeElement.querySelector("#save-button") as HTMLButtonElement;
    const title = () => nativeElement.querySelector("input#title") as HTMLInputElement;
    const author = () => nativeElement.querySelector("input#author") as HTMLInputElement;
    const description = () => nativeElement.querySelector("textarea#description") as HTMLTextAreaElement;
    // verbs
    const clickBookAt = (position: number) => bookElementAt(position).dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => {
      field.value = value;
      field.dispatchEvent(new Event('input'));
    };
    const cd = () => fixture.detectChanges();
    const cdt = (delay: number | undefined = undefined) => {
      fixture.detectChanges();
      tick(delay);
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent, EditionDetailsComponent],
        imports: [ReactiveFormsModule, SharedModule],
        providers: [
          {provide: BooksService, useValue: bookServiceMock},
          provideMockStore({
            initialState: initialBooksState, selectors: [
              {
                selector: BooksSelector.getBooks,
                value: books()
              },
              {
                selector: BooksSelector.getSelectedBook,
                value: null
              }
            ]
          }),
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      booksService = TestBed.inject(BooksService);
      storeMock = TestBed.inject(MockStore);
      // booksService = fixture.debugElement.injector.get(BooksService);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('can be created', () => {
      expect(component).toBeTruthy();
    });

    it('renders a list of books', () => {
      const liElements = bookList();
      expect(liElements.length).toBe(3);
    });

    it('selects book on clicking', () => {
      // given
      expect(component.selectedBookId).toBeUndefined();
      expect(editor()).toBeFalsy();
      // when
      clickBookAt(1);
      selectBook(books()[1]);
      cd();
      // then
      expect(editor()).toBeTruthy();
      const toBeSelected = books()[1];
      expect(component.selectedBookId).toEqual(toBeSelected.id);
      expect(title().value).toBe(toBeSelected.title);
      expect(author().value).toBe(toBeSelected.author);
      expect(description().value).toBe(toBeSelected.description);
      expect(bookElementAt(1).classList.contains("selected")).toBeTruthy();
    });

    it('closes editor after clicking on selected book', () => {
      // given
      expect(component.selectedBookId).toBeUndefined();
      clickBookAt(1);
      selectBook(books()[1]);
      cd();
      expect(editor()).toBeTruthy();
      // when
      clickBookAt(1);
      selectBook(null);
      cd();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBookId).toBeUndefined();
    });

    it('closes editor after clicking on cancel button', () => {
      // given
      expect(component.selectedBookId).toBeUndefined();
      clickBookAt(1);
      selectBook(books()[1]);
      cd();
      expect(editor()).toBeTruthy();
      // when
      clickCancel();
      selectBook(null);
      cd();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBookId).toBeUndefined();
    });

    it('saves modified book to the books service', () => {
      // given
      spyOn(booksService, 'saveBook').and.callThrough();
      clickBookAt(1);
      selectBook(books()[1]);
      cd();
      expect(editor()).toBeTruthy();
      // when
      editField(title(), 'Foo');
      editField(author(), 'Bar');
      editField(description(), 'Some nonsense');
      cd();
      clickSave();
      selectBook(null);
      cd();
      // then
      expect(editor()).toBeFalsy();
      expect(booksService.saveBook).toHaveBeenCalledOnceWith({
        id: 2,
        title: "Foo",
        author: "Bar",
        description: "Some nonsense",
        edition: {
          publisher: 'Amazon2',
          publishYear: 1992,
          editionNumber: 3
        }
      });
    });

  });
});
