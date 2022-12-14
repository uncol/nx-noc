import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { HTTPError } from '@error-util';
import { AUTH_API, DATA_API } from '@global-variable';
import {
  Observable,
  catchError,
  exhaustMap,
  first,
  mergeMap,
  throwError,
  withLatestFrom,
} from 'rxjs';

import { LoginFacade } from '../application';
import { EMPTY_TOKEN } from '../entities';

export const tokenInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const dataAPIs = inject<string[]>(DATA_API);
  const loginFacade = inject(LoginFacade);

  if (isDataUrl(dataAPIs, request.url)) {
    return loginFacade.tokens$.pipe(
      first(),
      withLatestFrom(loginFacade.visitorId$),
      mergeMap(([tokens, visitorId]) => {
        const authReq = tokens
          ? request.clone({
              setHeaders: { Authorization: 'Bearer ' + tokens.access_token },
            })
          : request;
        if (tokens.access_token === EMPTY_TOKEN) {
          throwError(() => 'Empty Token');
        }
        const expireTime =
          JSON.parse(window.atob(tokens.access_token.split('.')[1])).exp * 1000;
        if (expireTime < new Date().getTime()) {
          return loginFacade.refreshTokens(visitorId).pipe(
            exhaustMap((tokens) => {
              const authReq = tokens
                ? request.clone({
                    setHeaders: {
                      Authorization: 'Bearer ' + tokens.access_token,
                    },
                  })
                : request;
              if (tokens) {
                loginFacade.saveTokens(tokens);
              }
              return next(authReq);
            }),
            catchError((error: HTTPError) => throwError(() => error))
          );
        }
        return next(authReq);
      })
    );
  }
  return next(request);
};

export const cookiesInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authAPI = inject(AUTH_API);

  if (request.url.startsWith(authAPI)) {
    request = request.clone({
      withCredentials: true,
    });
  }
  return next(request);
};

export const authErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authAPI = inject(AUTH_API);
  const loginFacade = inject(LoginFacade);

  if (!request.url.includes(authAPI)) {
    return next(request);
  }

  return next(request).pipe(
    catchError((response) => {
      if (response instanceof HttpErrorResponse) {
        if (response.status === 401) {
          loginFacade.loginRedirect();
        }
      }
      return throwError(
        () =>
          new Error(
            response.error ? response.error.message : response.statusMessage
          )
      );
    })
  );
};
function isDataUrl(dataBaseUrls: string[], url: string): boolean {
  for (const base of dataBaseUrls) {
    if (url.startsWith(base)) return true;
  }
  return false;
}
