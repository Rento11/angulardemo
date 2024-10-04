import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Demo';
  public currentRoute : any;
  constructor(private router:Router) {
  }

  goToProducts() {
    this.router.navigateByUrl("/products");
    this.currentRoute = "products";
  }

  goToHome() {
    this.router.navigateByUrl("/home");
    this.currentRoute = "home";
  }

  goToNewProduct() {
    this.router.navigateByUrl("/newProduct");
    this.currentRoute = "newProduct";
  }
}
