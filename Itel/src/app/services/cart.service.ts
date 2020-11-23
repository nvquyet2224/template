import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private data = [
    {
      category: "Pizza",
      expand: true,
      products: [
        {id: 1, name: 'Tuna', price: '9'},
        {id: 2, name: 'Tuna3', price: '9'},
        {id: 3, name: 'Tuna1', price: '9'},
        {id: 4, name: 'Tuna3', price: '9'},
      ]
    },
    {
      category: "Pasta",
      products: [
        {id: 5, name: 'Tuna1', price: '9'},
        {id: 6, name: 'Tuna3', price: '9'},
      ]
    }
  ]
  private cart = [];
  constructor() { }
  getProducts() {
    return this.data;
  }
  getCart() {
    return this.cart;
  }
  addProduct(product) {
    this.cart.push(product);
  }
}
