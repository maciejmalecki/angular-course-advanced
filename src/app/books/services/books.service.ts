import {Injectable} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_PREFIX = '/api/books';

@Injectable()
export class BooksService {

  constructor(private readonly http: HttpClient) {
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_PREFIX}`);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${API_PREFIX}/${book.id}`, book);
  }
}
