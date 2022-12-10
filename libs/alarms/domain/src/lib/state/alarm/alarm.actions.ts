import { createAction, props } from '@ngrx/store';

import { Alarm } from '../../entities';

export const loadAlarm = createAction('[Alarm] Load Alarm');

export const loadAlarmSuccess = createAction(
  '[Alarm] Load Alarm Success',
  props<{ alarm: Alarm[] }>()
);

export const loadAlarmFailure = createAction(
  '[Alarm] Load Alarm Failure',
  props<{ error: any }>()
);
