import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
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
