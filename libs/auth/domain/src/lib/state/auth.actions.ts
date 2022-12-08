import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Tokens } from '../entities/auth.payload';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Redirect': emptyProps(),
    'Refresh Token': props<{ visitorId: string }>(),
    'Save Tokens': props<{ tokens: Tokens }>(),
    'Save Path': props<{ path: string }>(),
    'Clean Saved Path': emptyProps(),
  },
});
