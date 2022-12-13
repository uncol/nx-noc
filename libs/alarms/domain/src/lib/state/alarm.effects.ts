import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AlarmDataService } from '../infrastructure';

import { AlarmsActions } from './alarm.actions';

@Injectable()
export class AlarmEffects {
  loadAlarm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlarmsActions.startLoadList),
      switchMap(() =>
        this.alarmDataService.getAll().pipe(
          map((alarms) => AlarmsActions.listLoadedSuccessfully({ alarms })),
          catchError((error) => of(AlarmsActions.listFailedToLoad({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private alarmDataService: AlarmDataService
  ) {}
}
