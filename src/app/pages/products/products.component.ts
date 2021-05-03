import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

   productList: any = [];
   viewProd:any=[];
   cargando:boolean= false;
   productUpdateForm: FormGroup;

  constructor(private _productService: ProductService,
    private _router: Router,
    private _fb: FormBuilder) {
    this.cargando = true;
    this._productService.getProducts().subscribe(
      (prods:any) =>{
        console.log(prods);
        console.log(prods.message);
        console.log(prods.result);
        console.log( prods.payload.Data[0]);
        this.productList = prods.payload.Data;
        console.log(this.productList);
        this.cargando = false;
      }
    );
    this.loadFormFirst();
   }

   getCampoNoValido(nombrecampo: string) {
    return this.productUpdateForm.get(nombrecampo).invalid && this.productUpdateForm.get(nombrecampo).touched;
  }

  ngOnInit(): void {
  }

  consultProduct(idProduct: number){
    this._productService.getProduct(idProduct).subscribe(
      (prod:any)=>{
        console.log(prod);
        this.viewProd = prod;
      }
    )
  }

  editProduct(idProduct: number){
    this._productService.getProduct(idProduct).subscribe(
      (prod:any)=>{
        console.log(prod);
        this.viewProd = prod;
      }
    );
    this.loadFormFirst();
  }

  createProduct(){
    this._router.navigateByUrl('createProduct');
  }

  deleteProduct(){
    Swal.fire({
      title: 'Eliminar',
      text: '¿Está seguro que desea eliminar el producto?',
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar'
    })
  }

  editProductConfirmation(){
    Swal.fire({
      title: 'Editar',
      text: '¿Está seguro que desea editar el producto?',
      icon: 'question',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText:'Cancelar'
    }).then(resp=>{
      console.log("Confirmacion");
      console.log(this.productUpdateForm.get('nombreProducto').value);
      var product: Product = {
        IdProducto:this.viewProd.idProducto,
        Estado: true,
        TipoProducto: Number(this.productUpdateForm.get('tipoProducto').value) ,
        NombreProducto: this.productUpdateForm.get('nombreProducto').value,
        DescripcionProducto: this.productUpdateForm.get('descripcionProducto').value,
        CategoriaProducto: Number(this.productUpdateForm.get('categoriaProducto').value),
        CodigoBarras: Number(this.productUpdateForm.get('codigoBarras').value),
        IdImpuesto: Number(this.productUpdateForm.get('impuesto').value),
        CantidadEnBodega: Number(this.productUpdateForm.get('cantidadActual').value),
        CantidadMinima: Number(this.productUpdateForm.get('cantidadMinima').value),
        CantidadMaxima: Number(this.productUpdateForm.get('cantidadMaxima').value),
        UnidadMedida: Number(this.productUpdateForm.get('unidadMedida').value),
        FechaCreacion: new Date(),
        FechaActualizacion: new Date()
      };
      this._productService.updateProduct(product).subscribe((res:any) =>{
        if (res.result) {
          Swal.fire({
            title: 'Exitoso',
            text: 'La actualización del producto ha sido exitosa',
            icon: 'success',
          }).then(response =>{

          });
        }
        else{
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error en la actualizacion del producto, por favor revise el log',
              icon: 'error',
            }).then(response =>{

            });
        }
      });

      //Volver a cargar grilla
      this._productService.getProducts().subscribe(
        (prods:any) =>{
          console.log(prods);
          console.log(prods.message);
          console.log(prods.result);
          console.log( prods.payload.Data[0]);
          this.productList = prods.payload.Data;
          console.log(this.productList);
          this.cargando = false;
        }
      );

      // Validar los campos antes de entrar
      // PENDIENTE *****
      console.log(resp.value);
      console.log(this.productUpdateForm);
      if (resp.value) {
        if (this.productUpdateForm) {
          //Validar todas las reglas de los campos
          // return Object.values(this.productUpdateForm.controls).forEach(control => {
          //   control.markAllAsTouched();
          // });
        }
        else{
          console.log("Todo Bien!");
          return Object.values(this.productUpdateForm.controls).forEach(control => {
            control.markAsUntouched();
          });
        }
      }
    });
  }

  loadFormFirst(){
    this.productUpdateForm = this._fb.group({
      nombreProducto: [this.viewProd, ],
      descripcionProducto: ['', ],
      tipoProducto: ['', ],
      categoriaProducto: ['', ],
      codigoBarras: ['', ],
      impuesto: ['', ],
      cantidadActual: ['', ],
      cantidadMinima: ['', ],
      cantidadMaxima: ['', ],
      unidadMedida: ['', ],
    });

  }

}
