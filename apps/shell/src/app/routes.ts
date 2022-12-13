import { Route } from '@angular/router';
import { loggedInGuard } from '@auth-domain';
import { LoginPageComponent } from '@auth-feature-login';

import { HomeComponent } from './home/home.component';

export const SHELL_ROUTES: Route[] = [
  {
    path: '',
    title: 'Shell - Home',
    canActivate: [loggedInGuard],
    component: HomeComponent,
  },
  {
    path: 'login',
    title: 'Auth - Login',
    component: LoginPageComponent,
  },
];
