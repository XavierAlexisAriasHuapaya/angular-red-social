import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './authentication/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './authentication/guards/is-authenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [isNotAuthenticatedGuard],
        loadChildren: () => import('./authentication/app.authentication.routes').then(c => c.routes)
    },
    {
        path: 'main',
        canActivate: [isAuthenticatedGuard],
        loadChildren: () => import('./main/app.main.routes').then(c => c.routes)
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
