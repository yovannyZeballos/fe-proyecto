import { Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';

export const routes: Routes = [
    {
        path: 'auth',
        component: NbAuthComponent,
        loadChildren: () => import('./auth/auth.routes'),
    }
];
