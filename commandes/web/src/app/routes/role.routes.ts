import { Routes } from '@angular/router';

export const ROLE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../components/roles/role-list/role-list.component').then(m => m.RoleListComponent)
    }
];
