import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then(c => c.MainLayoutComponent),
        children: [
            {
                path: 'chat',
                loadComponent: () => import('./pages/chat/chat.component').then(c => c.ChatComponent)
            },
            {
                path: '**',
                redirectTo: 'chat',
                pathMatch: 'full'
            }
        ]
    }
];
