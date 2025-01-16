import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from '../interface';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { title } from 'process';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  productsService = inject(ProductsService);
  cartItems = computed(() => this.productsService.cart());
  totalAmount = computed(() =>
    this.cartItems().reduce(
      (total: number, item: IProduct) =>
        total + item?.price * (item?.quantity ?? 1),
      0
    )
  );

  readonly QUANTITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  dialog = inject(MatDialog);

  openDialog(product: IProduct) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to remove this item?',
      },
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.productsService.removeFromCart(product);
    });
  }

  onQuantityChange(event: Event, product: IProduct) {
    const target = event.target as HTMLSelectElement;
    const quantity = parseInt(target.value);
    if (!isNaN(quantity)) {
      this.productsService.updateQuantity(product, quantity);
    }
  }
}
