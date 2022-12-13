import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { loggedInGuard } from '@auth-domain';

import { NOCManifest } from './model';
import { SHELL_ROUTES } from './routes';

export function buildRoutes(options: NOCManifest): Routes {
  const lazyRoutes: Routes = Object.keys(options).map((key) => {
    const entry = options[key];
    return {
      path: entry.routePath,
      canActivate: [loggedInGuard],
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: entry.remoteEntry,
          exposedModule: entry.exposedModule,
        }),
    };
  });

  return [...SHELL_ROUTES, ...lazyRoutes];
}
