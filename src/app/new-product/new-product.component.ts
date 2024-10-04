import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
  public productForm!:FormGroup;
  constructor(private fb:FormBuilder, private ps:ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name : this.fb.control('', [Validators.required]),
      price : this.fb.control(''),
      checked : this.fb.control(false),
    })
  }

  saveProduct() {
    let p = this.productForm.value;
    this.ps.saveProduct(p).subscribe({
      next : data=>{
        alert(JSON.stringify(data));
      },
      error : err => {
        console.log(err);
      }
    })
  }
}
