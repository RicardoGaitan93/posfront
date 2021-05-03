import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../../Services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  constructor(private _fb: FormBuilder,
    private _productService: ProductService) {
    this.productForm = this._fb.group({
      nombreProducto: ['', [Validators.required, Validators.minLength(4)]],
      descripcionProducto: ['', [Validators.required, Validators.minLength(4)]],
      tipoProducto: ['', [Validators.required, Validators.minLength(1)]],
      categoriaProducto: ['', [Validators.required, Validators.minLength(1)]],
      codigoBarras: ['', [Validators.required, Validators.minLength(1)]],
      impuesto: ['', [Validators.required, Validators.minLength(1)]],
      cantidadActual: ['', [Validators.required, Validators.minLength(1)]],
      cantidadMinima: ['', [Validators.required, Validators.minLength(1)]],
      cantidadMaxima: ['', [Validators.required, Validators.minLength(1)]],
      unidadMedida: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getCampoNoValido(nombrecampo: string) {
    return this.productForm.get(nombrecampo).invalid && this.productForm.get(nombrecampo).touched;
  }

  ngOnInit(): void {
  }

  createNewProduct() {

    if (this.productForm) {
      //Validar todas las reglas de los campos
      return Object.values(this.productForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
    }
    else{
    // console.log(this.productForm);
    // console.log('Nombre Producto' + this.productForm.get('nombreProducto').value);


    // Obtener datos del formulario

    var product: Product = {
      IdProducto:0 ,
      Estado: true,
      TipoProducto: Number(this.productForm.get('tipoProducto').value) ,
      NombreProducto: this.productForm.get('nombreProducto').value,
      DescripcionProducto: this.productForm.get('descripcionProducto').value,
      CategoriaProducto: Number(this.productForm.get('categoriaProducto').value),
      CodigoBarras: Number(this.productForm.get('codigoBarras').value),
      IdImpuesto: Number(this.productForm.get('impuesto').value),
      CantidadEnBodega: Number(this.productForm.get('cantidadActual').value),
      CantidadMinima: Number(this.productForm.get('cantidadMinima').value),
      CantidadMaxima: Number(this.productForm.get('cantidadMaxima').value),
      UnidadMedida: Number(this.productForm.get('unidadMedida').value),
      FechaCreacion: new Date(),
      FechaActualizacion: new Date()
    };

    console.log(product);

    this._productService.addProduct(product).subscribe(param =>{
      console.log(param);
    });
    }
  }

}
