import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../models/constant';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public _urlBase = '';
  constructor(private _httpClient: HttpClient) {
    this._urlBase= Constant.urlBase;
  }

  getProducts(){
     return this._httpClient.get(`${this._urlBase}/product/GetAllProducts/`);
  }

  getProduct(id:number){
    return this._httpClient.get(`${this._urlBase}/product/${id}`);
  }

  addProduct(product :Product){
    console.log("Servicio");
    console.log(product);
    return this._httpClient.post(`${this._urlBase}/product/CreateProduct/`,product);
  }

  updateProduct(product :Product){
    return this._httpClient.put(`${this._urlBase}/product/UpdateProduct/`,product);
  }

}
