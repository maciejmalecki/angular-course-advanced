import {Injectable} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class BooksService {

  readonly API_PREFIX = "/api/books";

  constructor(private readonly httpClient: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.API_PREFIX}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.API_PREFIX}/${book.id}`, book);
  }
}
