import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './components/book-list/book-list.component';
import {BooksService} from "./services/books.service";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {EditionDetailsComponent} from './components/book-details/edition-details/edition-details.component';
import {StoreModule} from "@ngrx/store";
import {BOOKS_FEATURE, booksStateReducer} from "./store/books.reducer";
import {BooksRoutingModule} from "./books-routing.module";
import {AppLibModule} from "../../../projects/app-lib/src/lib/app-lib.module";

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    EditionDetailsComponent
  ],
  exports: [
    BookListComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    AppLibModule,
    StoreModule.forFeature(BOOKS_FEATURE, booksStateReducer),
    BooksRoutingModule
  ],
  providers: [
    BooksService
  ]
})
export class BooksModule {
}
