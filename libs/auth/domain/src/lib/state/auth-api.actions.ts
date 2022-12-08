import { HTTPError } from '@error-util';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Tokens } from '../entities/auth.payload';

export const AuthApiActions = createActionGroup({
  source: 'Auth/API',
  events: {
    'Login Success': props<{ tokens: Tokens }>(),
    'Login Failure': props<{ error: HTTPError }>(),
    'Refresh Token Success': props<{ tokens: Tokens }>(),
    'Refresh Token Failure': props<{ error: HTTPError }>(),
    'Logout Success': emptyProps(),
    'Logout Confirmation': emptyProps(),
    'Logout Confirmation Dismiss': emptyProps(),
    'Logout Failure': props<{ error: HTTPError }>(),
  },
});
