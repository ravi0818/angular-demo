import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cart: any = signal([]);
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  addToCart(product: any) {
    const isDuplicate = this.cart().find((item: any) => item.id === product.id);
    if (isDuplicate) return;
    this.cart.update((cart: any) => {
      cart.push(product);
      return cart;
    });
  }
}
