import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BookListComponent} from "./components/book-list/book-list.component";

const routes: Routes = [
  {
    path: '',
    component: BookListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BooksRoutingModule {
}
