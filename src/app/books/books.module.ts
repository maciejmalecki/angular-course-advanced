import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BookListComponent
  ],
  providers: [
    BookService
  ]
})
export class BooksModule {
}
