import { ListComponent } from '@alarm-list';
import { provideAlarmsDomain } from '@alarms-domain';
import { Route } from '@angular/router';

export default [
  {
    path: '',
    title: 'Alarms - Home',
    component: ListComponent,
    providers: [provideAlarmsDomain()],
  },
] as Route[];
