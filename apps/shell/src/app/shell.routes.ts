import { Route } from '@angular/router';
import { provideAuthDomain } from '@auth-domain';
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
    title: 'Shell - Login',
    providers: [provideAuthDomain()],
    component: LoginPageComponent,
  },
];
