import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../authentication/layouts/authentication-layout/authentication-layout.component').then(c => c.AuthenticationLayoutComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login-page/login-page.component').then(c => c.LoginPageComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register-page/register-page.component').then(c => c.RegisterPageComponent)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];
