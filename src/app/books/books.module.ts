import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
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
