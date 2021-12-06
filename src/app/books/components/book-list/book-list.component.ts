import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];

  selectedBook: Book | undefined = undefined;

  @ViewChild("title", { static: false })
  titleInputComponent!: ElementRef;

  @ViewChild("author", { static: false })
  authorInputComponent!: ElementRef;

  @ViewChild("description", { static: false })
  descriptionTextAreaComponent!: ElementRef;

  constructor(private readonly bookService: BookService) {
    this.books = bookService.getBooks();
  }

  ngOnInit(): void {
  }

  selectBook(id: number | undefined): void {
    if (id) {
      this.selectedBook = this.bookService.getBook(id);
    }
  }

  saveBook(): void {
    if (this.selectedBook) {
      const updatedBook: Book = {
        id: this.selectedBook.id,
        title: this.titleInputComponent.nativeElement.value,
        author: this.authorInputComponent.nativeElement.value,
        description: this.descriptionTextAreaComponent.nativeElement.value
      }
      this.bookService.saveBook(updatedBook);
      this.selectedBook = undefined;
      this.books = this.bookService.getBooks();
    }
  }

  cancel() {
    this.selectedBook = undefined;
  }
}
