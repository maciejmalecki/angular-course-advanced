import { BookListComponent } from './book-list.component';
import {BooksService} from "../../service/books.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Book} from "../../model/book";

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
    let booksService: BooksService;

    // nouns
    const bookList = () => nativeElement.querySelectorAll("li.list-group-item");
    const bookElementAt = (position: number) => bookList().item(position) as HTMLLIElement;
    const editor = () => nativeElement.querySelector("#editor");
    const cancelButton = () => nativeElement.querySelector("button.btn.btn-light") as HTMLButtonElement;
    const saveButton = () => nativeElement.querySelector("button.btn.btn-primary") as HTMLButtonElement;
    const title = () => nativeElement.querySelector("input#title") as HTMLInputElement;
    const author = () => nativeElement.querySelector("input#author") as HTMLInputElement;
    const description = () => nativeElement.querySelector("textarea#description") as HTMLTextAreaElement;
    // verbs
    const clickBookAt = (position: number) => bookElementAt(position).dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => field.value = value;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        providers: [BooksService]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      booksService = TestBed.inject(BooksService);
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
      expect(component.selectedBook).toBeNull();
      expect(editor()).toBeFalsy();
      // when
      clickBookAt(1);
      fixture.detectChanges();
      // then
      expect(editor()).toBeTruthy();
      const toBeSelected = component.books[1];
      expect(component.selectedBook).toEqual(toBeSelected);
      expect(title().value).toBe(toBeSelected.title);
      expect(author().value).toBe(toBeSelected.author);
      expect(description().value).toBe(toBeSelected.description);
      expect(bookElementAt(1).classList.contains("selected")).toBeTruthy();
    });

    it('closes editor after clicking on selected book', () => {
      // given
      expect(component.selectedBook).toBeNull();
      clickBookAt(1);
      fixture.detectChanges();
      expect(editor()).toBeTruthy();
      // when
      clickBookAt(1);
      fixture.detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBook).toBeNull();
    });

    it('closes editor after clicking on cancel button', () => {
      // given
      expect(component.selectedBook).toBeNull();
      clickBookAt(1);
      fixture.detectChanges();
      expect(editor()).toBeTruthy();
      // when
      clickCancel();
      fixture.detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBook).toBeNull();
    });

    it('saves modified book to the books service', () => {
      // given
      spyOn(booksService, 'saveBook').and.callThrough();
      clickBookAt(1);
      fixture.detectChanges();
      expect(editor()).toBeTruthy();
      // when
      editField(title(), 'Foo');
      editField(author(), 'Bar');
      editField(description(), 'Some nonsense');
      clickSave();
      fixture.detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(booksService.saveBook).toHaveBeenCalledOnceWith({
        id: 2,
        title: "Foo",
        author: "Bar",
        description: "Some nonsense"
      });
    });

  });
});
