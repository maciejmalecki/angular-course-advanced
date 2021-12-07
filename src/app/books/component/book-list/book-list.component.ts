import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {BooksService} from "../../service/books.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BooksService]
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private readonly bookService: BooksService) {
    this.books = this.bookService.getBooks();
  }

  ngOnInit(): void {
  }

}
