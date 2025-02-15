import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => HomeComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./routes/user.routes').then(m => m.USER_ROUTES),
  },
  {
    path: 'produits',
    loadChildren: () => import('./routes/produit.routes').then(m => m.PRODUIT_ROUTES),
  },
  {
    path: 'roles',
    loadChildren: () => import('./routes/role.routes').then(m => m.ROLE_ROUTES),
  },
];
