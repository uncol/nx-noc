import { Route } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersComponent } from './users/users.component';
import { loggedInGuard } from '@auth-domain';
import { PageNotFoundComponent } from '../../../shell/src/app/page-not-found/page-not-found.component';

export default [
  {
    path: '',
    component: NavigationComponent,
    // canActivate: [loggedInGuard],
    children: [
      {
        path: 'home',
        title: 'Assets - Home',
        outlet: 'assets',
        component: HomeComponent,
      },
      {
        path: 'users',
        title: 'Assets - Users',
        outlet: 'assets',
        component: UsersComponent,
      },
      {
        path: '**',
        outlet: 'assets',
        component: PageNotFoundComponent,
      },
    ],
  },
] as Route[];
