import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import { BookDetailsComponent } from './components/book-details/book-details.component';



@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent
  ],
  exports: [
    BookListComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule { }
