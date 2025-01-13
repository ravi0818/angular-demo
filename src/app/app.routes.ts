import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/todos.component').then((m) => m.TodosComponent),
  },
  {
    path: 'games',
    loadComponent: () =>
      import('./games/games.component').then((m) => m.GamesComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then((m) => m.CartComponent),
  },
];
