import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../components/users/user-list/user-list.component').then(m => m.UserListComponent)
    }
];
