import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeadsComponent} from './leads/leads.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'leads',
    component: LeadsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
