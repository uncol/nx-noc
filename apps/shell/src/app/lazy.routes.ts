import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

// import { CanActivateGuard } from './guards/can-activate.guard';
import { NOCManifest } from './model';
import { SHELL_ROUTES } from './shell.routes';

export function buildRoutes(options: NOCManifest): Routes {
  const lazyRoutes: Routes = Object.keys(options).map((key) => {
    const entry = options[key];
    return {
      path: entry.routePath,
      // canActivate: [CanActivateGuard],
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
