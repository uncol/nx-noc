import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const SHELL_ROUTES: Route[] = [
  {
    path: '',
    title: 'Shell - Home',
    component: HomeComponent,
  },
];
