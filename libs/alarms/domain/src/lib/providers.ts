import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { AlarmEffects } from './state/alarm/alarm.effects';
import { ALARM_FEATURE_KEY, reducer } from './state/alarm/alarm.reducer';

export function provideAlarmsDomain() {
  return [
    provideState(ALARM_FEATURE_KEY, reducer),
    provideEffects([AlarmEffects]),
  ];
}

export function provideAlarmsRootStore() {
  return [
    provideStore({ [ALARM_FEATURE_KEY]: reducer }),
    provideEffects([AlarmEffects]),
  ];
}
