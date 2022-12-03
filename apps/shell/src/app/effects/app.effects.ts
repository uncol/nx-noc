import { getManifest } from '@angular-architects/module-federation';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';

import { AppActions } from '../actions';
import { buildRoutes } from '../lazy.routes';
import { NOCManifest } from '../model';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private router: Router) {}
  // noinspection JSUnusedGlobalSymbols
  loadManifest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadManifest),
      map(() => {
        const manifest = getManifest<NOCManifest>();

        if (Object.keys(manifest).length <= 0) {
          return AppActions.loadManifestFailure({
            error: { message: 'Empty Manifest' },
          });
        }
        const routes = buildRoutes(manifest);
        this.router.resetConfig(routes);
        return AppActions.loadManifestSuccess({ manifest });
      }),
      catchError((error: Error, caught) => {
        of(
          AppActions.loadManifestFailure({
            error: { message: 'Error Loading Manifest' },
          })
        );
        return caught;
      })
    );
  });
}
