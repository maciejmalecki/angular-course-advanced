import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BookListComponent
  ]
})
export class BooksModule {
}
