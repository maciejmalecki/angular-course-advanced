import {BookListComponent} from './book-list.component';
import {BookService} from "../../services/book.service";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('BookListComponent', () => {
  let component: BookListComponent;

  describe("[class]", () => {
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

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;
    let bookService: BookService;

    const bookList = () => nativeElement.querySelectorAll('ul.list-group.list-group-numbered li');
    const bookAt = (position: number) => bookList().item(position);
    const clickBookAt = (position: number) => bookAt(position).dispatchEvent(new MouseEvent('click'));
    const editor = () => nativeElement.querySelector(".editor");
    const cancelButton = () => nativeElement.querySelector("button.btn.btn-light")!;
    const clickCancelButton = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const saveButton = () => nativeElement.querySelector("button.btn.btn-primary")!;
    const clickSaveButton = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const title = () => nativeElement.querySelector("input#title")! as HTMLInputElement;
    const author = () => nativeElement.querySelector("input#author")! as HTMLInputElement;
    const description = () => nativeElement.querySelector("textarea#description")! as HTMLTextAreaElement;
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => {
      field.value = value;
      field.dispatchEvent(new Event('input'));
    };
    const cdt = (time?: number) => {
      fixture.detectChanges();
      tick(time);
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        imports: [ReactiveFormsModule],
        providers: [BookService]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      bookService = TestBed.inject(BookService);
      fixture.detectChanges();
    });

    it("can be created", () => {
      expect(component).toBeTruthy();
    });

    it("renders list of books", () => {
      const liElements: NodeList = bookList();
      expect(liElements.length).toBe(3);
    });

    it('selects book on clicking', () => {
      // given
      expect(component.selectedBook).toBeFalsy();
      expect(editor()).toBeFalsy();
      // when
      clickBookAt(1);
      fixture.detectChanges();
      // then
      expect(component.selectedBook).toBeTruthy();
      expect(component.selectedBook).toEqual(component.books[1]);
      expect(editor()).toBeTruthy();
    });

    it('closes book on clicking cancel', () => {
      // given
      clickBookAt(1);
      fixture.detectChanges();
      expect(editor()).toBeTruthy();
      // when
      clickCancelButton();
      fixture.detectChanges();
      // then
      expect(component.selectedBook).toBeFalsy();
      expect(editor()).toBeFalsy();
    });

    it('saves modified book to the service', () => {
      // given
      spyOn(bookService, "saveBook").and.callThrough();
      clickBookAt(1);
      fixture.detectChanges();
      expect(editor()).toBeTruthy();
      // when
      editField(title(), "foo");
      editField(author(), "bar");
      editField(description(), "some description");
      clickSaveButton();
      fixture.detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBook).toBeFalsy();
      expect(bookService.saveBook).toHaveBeenCalledOnceWith({
        id: 2,
        title: "foo",
        author: "bar",
        description: "some description"
      });
    });

  });
});
