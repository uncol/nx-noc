import { HTTPError } from '@error-util';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Credentials, Tokens } from '../entities';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Redirect': emptyProps(),
    'Refresh Token': props<{ visitorId: string }>(),
    'Save Tokens': props<{ tokens: Tokens }>(),
    'Save Path': props<{ path: string }>(),
    'Clean Saved Path': emptyProps(),
    'Generate Visitor Id': emptyProps(),
    'Generate Visitor Id Success': props<{ visitorId: string }>(),
    'Generate Visitor Id Failure': props<{ error: Error }>(),
    'Login Success': props<{ tokens: Tokens }>(),
    'Login Failure': props<{ error: HTTPError }>(),
    'Refresh Token Success': props<{ tokens: Tokens }>(),
    'Refresh Token Failure': props<{ error: HTTPError }>(),
    'Logout Success': emptyProps(),
    'Logout Confirmation': emptyProps(),
    'Logout Confirmation Dismiss': emptyProps(),
    'Logout Failure': props<{ error: HTTPError }>(),
    Login: props<{ credentials: Credentials }>(),
    Logout: emptyProps(),
  },
});
