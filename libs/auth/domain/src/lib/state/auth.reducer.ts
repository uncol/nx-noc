import { AppError } from '@error-util';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { EMPTY_TOKEN, Tokens } from '../entities';

import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  idleTimeout: number;
  tokens: Tokens;
  path: string;
  visitorId: string;
  loginPageError: AppError;
  loginPagePending: boolean;
}

const emptyTokens: Tokens = {
  access_token: EMPTY_TOKEN,
  expires_in: 0,
  token_type: 'bearer',
};

export const initialState: State = {
  idleTimeout: 15 * 60 * 1000, // 15 min,
  tokens: emptyTokens,
  path: '',
  visitorId: '',
  loginPageError: null,
  loginPagePending: false,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.refreshTokenSuccess,
    AuthActions.loginSuccess,
    (state, { tokens }): State => ({
      ...state,
      tokens,
    })
  ),
  on(
    AuthActions.logoutSuccess,
    (state): State => ({ ...initialState, path: state.path })
  ),
  on(
    AuthActions.savePath,
    (state, { path }): State => ({
      ...state,
      path: path !== 'login' ? path : '',
    })
  ),
  on(AuthActions.cleanSavedPath, (state): State => ({ ...state, path: '/' })),
  on(
    AuthActions.generateVisitorIdSuccess,
    (state: State, { visitorId }): State => ({ ...state, visitorId })
  ),
  on(
    AuthActions.refreshToken,
    (state): State => ({ ...state, tokens: emptyTokens })
  ),
  on(
    AuthActions.saveTokens,
    (state, { tokens }): State => ({ ...state, tokens })
  ),
  on(
    AuthActions.loginRedirect,
    (state): State => ({ ...state, tokens: emptyTokens })
  ),
  on(
    AuthActions.login,
    AuthActions.logout,
    (state): State => ({
      ...state,
      loginPageError: null,
      loginPagePending: true,
    })
  ),
  on(
    AuthActions.loginSuccess,
    AuthActions.logoutSuccess,
    (state): State => ({
      ...state,
      loginPageError: null,
      loginPagePending: false,
    })
  ),
  on(
    AuthActions.loginFailure,
    AuthActions.logoutFailure,
    (state, { error }): State => ({
      ...state,
      loginPageError: error,
      loginPagePending: false,
    })
  )
);
export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: reducer,
});
export const {
  selectAuthState,
  selectTokens,
  selectPath,
  selectIdleTimeout,
  selectVisitorId,
  selectLoginPageError,
  selectLoginPagePending,
} = authFeature;

export const selectLoggedIn = createSelector(
  selectTokens,
  (tokens: Tokens) => tokens.access_token !== EMPTY_TOKEN
);
