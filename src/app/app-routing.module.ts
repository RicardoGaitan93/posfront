import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';



const routes: Routes = [
  //path: 'Home' PagesRouting
  //path: 'Auth' AuthRouting
   {path:'**',component:NoPageFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
