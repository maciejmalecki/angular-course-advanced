import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    DashboardComponent,
    PageNotFoundComponent
  ],
  exports: [
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class CoreModule {
}
