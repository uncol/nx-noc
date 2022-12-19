import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { loggedInGuard } from '@auth-domain';
import { PageNotFoundComponent } from '@page-not-found';

import { HomeComponent } from './home/home.component';
import { NOCManifest } from './model';
import { SHELL_ROUTES } from './routes';

export function buildRoutes(options: NOCManifest): Routes {
  const lazyRoutes: Routes = Object.keys(options).map((key) => {
    const entry = options[key];
    return {
      path: entry.routePath,
      canActivate: [loggedInGuard],
      outlet: 'main',
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: entry.remoteEntry,
          exposedModule: entry.exposedModule,
        }),
    };
  });
  lazyRoutes.push({
    path: '**',
    outlet: 'main',
    component: PageNotFoundComponent,
  });
  console.log([
    {
      path: '',
      title: 'Shell - Home',
      canActivate: [loggedInGuard],
      component: HomeComponent,
      children: lazyRoutes,
    },
    ...SHELL_ROUTES,
  ]);
  return [
    {
      path: '',
      title: 'Shell - Home',
      canActivate: [loggedInGuard],
      component: HomeComponent,
      children: lazyRoutes,
    },
    ...SHELL_ROUTES,
  ];
}
