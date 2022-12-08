import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AlarmDataService } from '../../infrastructure/alarm.data.service';

import * as AlarmActions from './alarm.actions';

@Injectable()
export class AlarmEffects {
  loadAlarm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlarmActions.loadAlarm),
      switchMap((action) =>
        this.alarmDataService.load().pipe(
          map((alarm) => AlarmActions.loadAlarmSuccess({ alarm })),
          catchError((error) => of(AlarmActions.loadAlarmFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private alarmDataService: AlarmDataService
  ) {}
}
