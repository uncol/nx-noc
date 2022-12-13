import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import {
  authErrorInterceptor,
  cookiesInterceptor,
  tokenInterceptor,
} from './infrastructure';
import { AuthEffects } from './state/auth.effects';
import { authFeature } from './state/auth.reducer';

export function provideAuthDomain() {
  return [
    provideState(authFeature),
    provideEffects([AuthEffects]),
    provideHttpClient(
      withInterceptors([
        authErrorInterceptor,
        cookiesInterceptor,
        tokenInterceptor,
      ])
    ),
  ];
}
