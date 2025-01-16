import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from '../interface';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { title } from 'process';

@Component({
  selector: 'app-cart',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ConfirmDialogComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  productsService = inject(ProductsService);
  cartItems = computed(() => this.productsService.cart());
  totalAmount = computed(() =>
    this.cartItems().reduce(
      (total: number, item: IProduct) => total + item?.price,
      0
    )
  );

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

  removeFromCart(item: IProduct) {}
}
