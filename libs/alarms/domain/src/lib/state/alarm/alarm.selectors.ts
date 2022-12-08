import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  ALARM_FEATURE_KEY,
  AlarmPartialState,
  State,
  alarmAdapter,
} from './alarm.reducer';

// Lookup the 'Alarm' feature state managed by NgRx
export const getAlarmState = createFeatureSelector<AlarmPartialState, State>(
  ALARM_FEATURE_KEY
);

const { selectAll, selectEntities } = alarmAdapter.getSelectors();

export const getAlarmLoaded = createSelector(
  getAlarmState,
  (state: State) => state.loaded
);

export const getAlarmError = createSelector(
  getAlarmState,
  (state: State) => state.error
);

export const getAllAlarm = createSelector(getAlarmState, (state: State) =>
  selectAll(state)
);

export const getAlarmEntities = createSelector(getAlarmState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getAlarmState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAlarmEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
