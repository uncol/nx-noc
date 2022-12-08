import { Route } from '@angular/router';
import { provideAuthDomain } from '@auth-domain';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export default [
  {
    path: '',
    title: 'Assets - Home',
    component: HomeComponent,
    providers: [provideAuthDomain()],
  },
  {
    path: 'users',
    title: 'Assets - Users',
    component: UsersComponent,
  },
] as Route[];
