import { HTTPError } from '@error-util';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Alarm } from '../entities';

import { AlarmsActions } from './alarm.actions';

export const ALARM_FEATURE_KEY = 'alarms';

export interface State extends EntityState<Alarm> {
  selectedId?: string | number; // which Alarm record has been selected
  isLoading: boolean; // has the Alarm list been loaded
  error?: HTTPError | null; // last known error (if any)
}

export interface AlarmPartialState {
  readonly [ALARM_FEATURE_KEY]: State;
}

export const alarmAdapter: EntityAdapter<Alarm> = createEntityAdapter<Alarm>();

export const initialState: State = alarmAdapter.getInitialState({
  // set initial required properties
  isLoading: false,
});

const alarmReducer = createReducer(
  initialState,
  on(AlarmsActions.startLoadList, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AlarmsActions.listLoadedSuccessfully, (state, { alarms }) =>
    alarmAdapter.upsertMany(alarms, { ...state, loaded: true })
  ),
  on(
    AlarmsActions.detailStartLoadFromBackend,
    AlarmsActions.startLoadList,
    (state): State => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    AlarmsActions.listFailedToLoad,
    AlarmsActions.detailFailedToLoad,
    (state, { error }) => ({
      ...state,
      error,
      loaded: false,
    })
  ),
  on(AlarmsActions.detailLoadedSuccessfully, (state, { alarm }) =>
    alarmAdapter.setOne(alarm, {
      ...state,
      loaded: false,
    })
  ),
  on(AlarmsActions.removeAllAlarms, (state) => {
    return alarmAdapter.removeAll({ ...state, selectedUserId: null });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return alarmReducer(state, action);
}
