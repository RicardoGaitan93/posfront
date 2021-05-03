import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      { path: 'home', component: HomeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'supplier', component: SuppliersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'createProduct', component: CreateProductComponent },
      { path: '', redirectTo:'/home', pathMatch:'full'},
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
