import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { componentFactoryName } from '@angular/compiler';
import { ListComponent } from './list/list.component';
import { TableComponent } from './table/table.component';




const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'table',
    component: TableComponent

  }  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
