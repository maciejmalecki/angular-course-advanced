import {Component, OnInit } from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];

  selectedBook: Book | undefined = undefined;

  formGroup: FormGroup;

  constructor(private readonly bookService: BookService) {
    this.books = bookService.getBooks();
    this.formGroup = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [])
    });
  }

  ngOnInit(): void {
  }

  selectBook(id: number | undefined): void {
    if (id) {
      this.selectedBook = this.bookService.getBook(id);
      if (this.selectedBook) {
        this.formGroup.setValue({
          author: this.selectedBook.author,
          title: this.selectedBook.title,
          description: this.selectedBook.description
        });
      }
    }
  }

  saveBook(): void {
    if (this.selectedBook) {
      const updatedBook = { ...this.selectedBook, ...this.formGroup.value };
      this.bookService.saveBook(updatedBook);
      this.selectedBook = undefined;
      this.books = this.bookService.getBooks();
    }
  }

  cancel() {
    this.selectedBook = undefined;
  }
}
