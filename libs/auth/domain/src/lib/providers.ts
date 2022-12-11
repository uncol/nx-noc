import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AuthEffects } from './state/auth.effects';
import { authFeature } from './state/auth.reducer';

export function provideAuthDomain() {
  return [provideState(authFeature), provideEffects([AuthEffects])];
}
