import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AlarmsActions } from '../state/alarm.actions';
import * as fromAlarm from '../state/alarm.reducer';
import * as AlarmSelectors from '../state/alarm.selectors';

@Injectable({ providedIn: 'root' })
export class ListFacade {
  loaded$ = this.store.pipe(select(AlarmSelectors.getAlarmLoaded));
  alarmList$ = this.store.pipe(select(AlarmSelectors.getAllAlarm));
  selectedAlarm$ = this.store.pipe(select(AlarmSelectors.getSelected));

  constructor(private store: Store<fromAlarm.AlarmPartialState>) {}

  load(): void {
    this.store.dispatch(AlarmsActions.startLoadList());
  }
}
