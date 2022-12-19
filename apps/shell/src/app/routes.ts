import { Route } from '@angular/router';
import { LoginPageComponent } from '@auth-feature-login';

export const SHELL_ROUTES: Route[] = [
  {
    path: 'login',
    title: 'Auth - Login',
    component: LoginPageComponent,
  },
];
