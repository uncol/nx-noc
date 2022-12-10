import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { authFeature } from './state/auth.reducer';

export function provideAuthDomain() {
  return [provideState(authFeature), provideEffects([])];
}
