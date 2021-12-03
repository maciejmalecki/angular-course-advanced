import { Component, OnInit } from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookService]
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private readonly bookService: BookService) {
    this.books = bookService.getBooks();
  }

  ngOnInit(): void {
  }

}
