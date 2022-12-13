import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPError } from '@error-util';
import { load } from '@fingerprintjs/fingerprintjs';
import {
  Actions,
  OnInitEffects,
  concatLatestFrom,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  filter,
  fromEvent,
  map,
  merge,
  of,
  switchMap,
  timer,
  withLatestFrom,
} from 'rxjs';

import { LoginFacade } from '../application';
import { Tokens } from '../entities';
import { AuthDataService } from '../infrastructure';

import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  clicks$ = fromEvent(document, 'click');
  keys$ = fromEvent(document, 'keydown');
  mouse$ = fromEvent(document, 'mousemove');

  constructor(
    private actions$: Actions,
    private authService: AuthDataService,
    private router: Router,
    private locationStrategy: LocationStrategy,
    private loginFacade: LoginFacade
  ) {}

  // noinspection JSUnusedGlobalSymbols
  idle$ = createEffect(() => {
    return merge(this.clicks$, this.keys$, this.mouse$).pipe(
      withLatestFrom(this.loginFacade.loggedIn$, this.loginFacade.idleTimeout$),
      filter(([, isLogged]) => isLogged),
      switchMap(([, , idleTimeout]) => {
        return timer(idleTimeout);
      }),
      map(() => {
        return AuthActions.idleTimeout();
      })
    );
  });
  // noinspection JSUnusedGlobalSymbols
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      concatLatestFrom(() => this.loginFacade.visitorId$),
      exhaustMap(([action, visitorId]) =>
        this.authService.login(action.credentials, visitorId).pipe(
          map((tokens: Tokens) => AuthActions.loginSuccess({ tokens })),
          catchError((error: HTTPError) =>
            of(AuthActions.loginFailure({ error }))
          )
        )
      )
    );
  });
  // noinspection JSUnusedGlobalSymbols
  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.refreshTokenSuccess),
      concatLatestFrom(() => this.loginFacade.path$),
      map(([, path]) => {
        this.router.navigateByUrl(path).then((result) => {
          if (!result) console.warn(`navigate to ${path} failure`);
        });
        return AuthActions.cleanSavedPath();
      })
    );
  });
  // noinspection JSUnusedGlobalSymbols
  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout, AuthActions.idleTimeout),
      concatLatestFrom(() => this.loginFacade.visitorId$),
      exhaustMap(([, visitorId]) =>
        this.authService.logout(visitorId).pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error: HTTPError) =>
            of(AuthActions.logoutFailure({ error }))
          )
        )
      )
    );
  });
  // noinspection JSUnusedGlobalSymbols
  refreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      exhaustMap((action) =>
        this.authService.refresh(action.visitorId).pipe(
          map((tokens: Tokens) => AuthActions.refreshTokenSuccess({ tokens })),
          catchError((error: HTTPError) =>
            of(AuthActions.refreshTokenFailure({ error }))
          )
        )
      )
    );
  });
  // noinspection JSUnusedGlobalSymbols
  refreshTokenSavePath$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.refreshToken, AuthActions.idleTimeout),
      map(() => AuthActions.savePath({ path: this.getPathWithoutBaseHref() }))
    );
  });
  // noinspection JSUnusedGlobalSymbols
  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          AuthActions.refreshTokenFailure,
          AuthActions.loginRedirect,
          AuthActions.logoutSuccess
        ),
        map(this.redirectToLogin())
      );
    },
    { dispatch: false }
  );

  // noinspection JSUnusedGlobalSymbols
  generateVisitorId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.generateVisitorId),
      switchMap(async () => {
        return (await (await load({ monitoring: false, debug: false })).get())
          .visitorId;
      }),
      map((visitorId: string) => {
        return AuthActions.generateVisitorIdSuccess({ visitorId });
      }),
      catchError((error: Error, caught) => {
        of(AuthActions.generateVisitorIdFailure({ error }));
        return caught;
      })
    );
  });

  // noinspection JSUnusedGlobalSymbols
  restoreToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.generateVisitorIdSuccess),
      map((action) => {
        return AuthActions.refreshToken({ visitorId: action.visitorId });
      })
    );
  });

  ngrxOnInitEffects(): Action {
    return AuthActions.generateVisitorId();
  }

  private redirectToLogin() {
    return () => {
      const path = this.getPathWithoutBaseHref();

      if (!(path.indexOf('login') in [0, 1])) {
        AuthActions.savePath({ path });
        this.router.navigate(['/login']).then((result) => {
          if (!result) console.warn('Navigate to login failure!');
        });
      }
    };
  }

  private getPathWithoutBaseHref(): string {
    return this.locationStrategy
      .path()
      .replace(this.locationStrategy.getBaseHref(), '');
  }
}
