import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Alarm } from '../../entities/alarm';

import * as AlarmActions from './alarm.actions';

export const ALARM_FEATURE_KEY = 'alarms';

export interface State extends EntityState<Alarm> {
  selectedId?: string | number; // which Alarm record has been selected
  loaded: boolean; // has the Alarm list been loaded
  error?: string | null; // last known error (if any)
}

export interface AlarmPartialState {
  readonly [ALARM_FEATURE_KEY]: State;
}

export const alarmAdapter: EntityAdapter<Alarm> = createEntityAdapter<Alarm>();

export const initialState: State = alarmAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const alarmReducer = createReducer(
  initialState,
  on(AlarmActions.loadAlarm, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AlarmActions.loadAlarmSuccess, (state, { alarm }) =>
    alarmAdapter.upsertMany(alarm, { ...state, loaded: true })
  ),
  on(AlarmActions.loadAlarmFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return alarmReducer(state, action);
}
