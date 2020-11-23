import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryTypeEnum } from 'src/app/models/enum/page-type-enum';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  cart = [];
  items = [];
  categorysList: Category[] = [];
  typeCate = CategoryTypeEnum;
  slidesConfig = {
    
  }
  constructor(private cartService: CartService, private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.items = this.cartService.getProducts();
    this.categoryService.getAll(this.typeCate.Suggest).subscribe(res => {
      this.categorysList = res;
      console.log('cate',res);
    })
  }
  addToCart(product) {
    this.cartService.addProduct(product);
  }
  openCart() {
    this.router.navigate(['dashboard']);
  }
}
