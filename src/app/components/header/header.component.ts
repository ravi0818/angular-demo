import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterLink, MatBadgeModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private routerSubscription!: Subscription;
  productsService = inject(ProductsService);
  isHomePage = signal(false);
  cartItems = this.productsService.cart();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Current Route:', this.router.url);
        if (this.router.url === '/') {
          this.isHomePage.set(true);
        } else {
          this.isHomePage.set(false);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
