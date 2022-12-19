import { Route } from '@angular/router';
import { LoginPageComponent } from '@auth-feature-login';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const SHELL_ROUTES: Route[] = [
  {
    path: 'login',
    title: 'Auth - Login',
    component: LoginPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  // { path: '**', component: PageNotFoundComponent },
];
