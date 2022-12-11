import { Route } from '@angular/router';
import { LoginPageComponent } from '@auth-feature-login';

import { HomeComponent } from './home/home.component';

export const SHELL_ROUTES: Route[] = [
  {
    path: '',
    title: 'Shell - Home',
    component: HomeComponent,
  },
  {
    path: 'login',
    title: 'Auth - Login',
    component: LoginPageComponent,
  },
];
