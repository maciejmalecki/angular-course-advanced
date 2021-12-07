import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './component/book-list/book-list.component';
import {BooksService} from "./service/books.service";



@NgModule({
  declarations: [
    BookListComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }
