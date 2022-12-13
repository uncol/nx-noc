import { HTTPError } from '@error-util';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Alarm } from '../entities';

export const AlarmsActions = createActionGroup({
  source: 'Alarms',
  events: {
    'List Page Open': emptyProps(),
    'Start Load List': emptyProps(),
    'List Loaded Successfully': props<{ alarms: Alarm[] }>(),
    'List Failed to Load': props<{ error: HTTPError }>(),
    'Detail Start Load From Backend': props<{ alarmId: string }>(),
    'Detail Loaded Successfully': props<{ alarm: Alarm }>(),
    'Detail Failed to Load': props<{ error: HTTPError; alarmId: string }>(),
    'Remove All Alarms': emptyProps(),
  },
});
