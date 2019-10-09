import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{BanklistingComponent} from './banklisting/banklisting.component'
import{FavComponent} from './banklisting/fav/fav.component'

const routes: Routes = [
  { path: '', redirectTo: '/banklisting', pathMatch: 'full' },
  {path:'banklisting', component:BanklistingComponent},
  {path:'banklisting/fav', component:FavComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
