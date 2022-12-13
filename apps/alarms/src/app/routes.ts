import { ListComponent } from '@alarm-list';
import { provideAlarmsDomain } from '@alarms-domain';
import { Route } from '@angular/router';

export default [
  {
    path: '',
    providers: [provideAlarmsDomain()],
    children: [
      {
        path: '',
        title: 'Alarms - Home',
        component: ListComponent,
      },
    ],
  },
] as Route[];
