import { Routes } from '@angular/router';

export const PRODUIT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../components/produits/produit-list/produit-list.component').then(m => m.ProduitListComponent)
    }
];
