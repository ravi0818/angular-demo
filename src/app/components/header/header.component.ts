import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterLink, MatBadgeModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private routerSubscription!: Subscription;
  productsService = inject(ProductsService);
  showCartIcon = signal(false);
  cartItems = computed(() => this.productsService.cart());

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/' || this.router.url === '/cart') {
          this.showCartIcon.set(true);
        } else {
          this.showCartIcon.set(false);
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
