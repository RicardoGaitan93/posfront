import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { CustomerComponent } from './customer/customer.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SharedModule } from '../components/shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    CustomerComponent,
    SuppliersComponent,
    ProductsComponent,
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule
  ],
  exports:[
    HomeComponent,
    PagesComponent,
    CustomerComponent,
    SuppliersComponent
  ]
})
export class PagesModule { }
