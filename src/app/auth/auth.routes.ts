import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';

export default [
  { path: '', component: AuthComponent },
  { path: 'login', component: AuthComponent },
] as Route[];
