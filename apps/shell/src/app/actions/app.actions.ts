import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AppError, NOCManifest } from '../model';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    'Clean Store': emptyProps(),
    'Load Manifest': emptyProps(),
    'Load Manifest Success': props<{ manifest: NOCManifest }>(),
    'Load Manifest Failure': props<{ error: AppError }>(),
    'Generate Visitor Id': emptyProps(),
    'Generate Visitor Id Success': props<{ visitorId: string }>(),
    'Generate Visitor Id Failure': props<{ error: Error }>(),
    'Idle Timeout': emptyProps(),
    'Close App Alert': props<{ uuid: string }>(),
  },
});
