import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./core/components/dashboard/dashboard.component";
import {BookListComponent} from "./books/components/book-list/book-list.component";
import {PageNotFoundComponent} from "./core/components/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'books',
    component: BookListComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
