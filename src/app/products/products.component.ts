import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  public products: Array<Product> = [];
  public keyword : string = "";
  constructor(public productService:ProductService) {
  }
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(){
    this.productService.getProducts(1,2)
      .subscribe({
        next : data => this.products = data,
        error : err => console.log(err)
      })
  }
  handleCheckProduct(p: Product) {
    this.productService.checkProduct(p)
      .subscribe({
        next : updatedProduct => {
          p.checked = !p.checked;
        }
      })
  }
  /*deleteProduct(p: any) {
    let index = this.products.indexOf(p);
    this.products.splice(index,1);
  }
  */
  deleteProduct(p: Product) {
    if(confirm("Etes vous sure de vouloir supprimer le produit ?"))
    this.productService.deleteProduct(p).subscribe({
      next : data => {
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }
  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : data =>{
        this.products = data;
      }
    })
  }
  /*
  search() {
    let result = [];
    for(let p of this.products){
      if (p.name.includes(this.keyword)){
        result.push(p);
      }
    }
    this.products = result;
  }
  */

}
