import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    BookListComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }
