import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from '../interface';

@Component({
  selector: 'app-cart',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  productsService = inject(ProductsService);
  cartItems = this.productsService.cart();
  totalAmount = this.cartItems.reduce(
    (total: number, item: IProduct) => total + item?.price,
    0
  );
}
