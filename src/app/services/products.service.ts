import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProduct } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  cart = signal<IProduct[]>([]);
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  addToCart(product: IProduct) {
    const isDuplicate = this.cart().find(
      (item: IProduct) => item.id === product.id
    );
    if (isDuplicate) return;
    this.cart.update((cart: IProduct[]) => {
      cart.push(product);
      return cart;
    });
  }
}
