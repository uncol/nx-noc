import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export default [
  {
    path: '',
    title: 'Assets - Home',
    component: HomeComponent,
  },
  {
    path: 'users',
    title: 'Assets - Users',
    component: UsersComponent,
  },
] as Route[];
