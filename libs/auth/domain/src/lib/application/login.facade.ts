import { Injectable } from '@angular/core';
import { AppError } from '@error-util';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Credentials, Tokens } from '../entities';
import { AuthDataService } from '../infrastructure';
import { AuthActions } from '../state/auth.actions';
import {
  selectIdleTimeout,
  selectLoggedIn,
  selectLoginPageError,
  selectLoginPagePending,
  selectPath,
  selectTokens,
  selectVisitorId,
} from '../state/auth.reducer';

@Injectable({ providedIn: 'root' })
export class LoginFacade {
  loginPagePending$: Observable<boolean> = this.store.select(
    selectLoginPagePending
  );
  loginPageError$: Observable<AppError> =
    this.store.select(selectLoginPageError);
  loggedIn$: Observable<boolean> = this.store.select(selectLoggedIn);
  tokens$: Observable<Tokens> = this.store.select(selectTokens);
  path$: Observable<string> = this.store.select(selectPath);
  idleTimeout$: Observable<number> = this.store.select(selectIdleTimeout);
  visitorId$: Observable<string> = this.store.select(selectVisitorId);

  constructor(public store: Store, private authService: AuthDataService) {}

  login(credentials: Credentials) {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  dispatchRefreshTokens(visitorId: string) {
    this.store.dispatch(AuthActions.refreshToken({ visitorId }));
  }

  refreshTokens(visitorId: string) {
    return this.authService.refresh(visitorId);
  }

  saveTokens(tokens: Tokens) {
    this.store.dispatch(AuthActions.saveTokens({ tokens }));
  }

  loginRedirect() {
    this.store.dispatch(AuthActions.loginRedirect());
  }

  savePath(path: string) {
    this.store.dispatch(AuthActions.savePath({ path }));
  }
}
