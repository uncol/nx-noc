import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersComponent } from './users/users.component';

export default [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'home',
        title: 'Assets - Home',
        component: HomeComponent,
      },
      {
        path: 'users',
        title: 'Assets - Users',
        component: UsersComponent,
      },
    ],
  },
] as Route[];
