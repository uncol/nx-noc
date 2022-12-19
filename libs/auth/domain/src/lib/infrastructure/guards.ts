import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoadFn,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { skipWhile } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginFacade } from '../application';

export const loggedInGuard: CanLoadFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const loginFacade = inject(LoginFacade);
  const router = inject(Router);

  return loginFacade.loggedIn$.pipe(
    skipWhile((isLogged) => {
      // wait refresh tokens when restore by url
      return (
        !isLogged &&
        // route.url[0]?.path !== 'login' &&
        router.getCurrentNavigation()?.id === 1
      );
    }),
    map((isLogged) => {
      if (!isLogged) {
        //     loginFacade.savePath(route.url[0].path);
        return router.parseUrl('login');
      }
      return true;
    })
  );
};
