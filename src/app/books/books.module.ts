import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BookListComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }
