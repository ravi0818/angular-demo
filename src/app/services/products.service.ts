import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { IProduct } from '@interface/product';

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
    this.cart.update((cart: IProduct[]) => {
      cart.push({ ...product, quantity: 1 });
      return cart;
    });
  }

  removeFromCart(product: IProduct) {
    this.cart.update((cart: IProduct[]) => {
      return cart.filter((item: IProduct) => item.id !== product.id);
    });
  }

  updateQuantity(product: IProduct, quantity: number) {
    this.cart.update((cart: IProduct[]) => {
      return cart.map((item: IProduct) => {
        if (item.id === product.id) {
          item.quantity = quantity;
        }
        return item;
      });
    });
  }
}
