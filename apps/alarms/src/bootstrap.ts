import { provideAlarmsRootStore } from '@alarms-domain';
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAuthDomain } from '@auth-domain';
import { LoginPageComponent } from '@auth-feature-login';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import ALARMS_ROUTES from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'AUTH_API', useValue: '/api/login' },
    provideHttpClient(),
    provideRouter(
      [
        ...ALARMS_ROUTES,
        {
          path: 'login',
          title: 'Alarms - Login',
          providers: [provideAuthDomain()],
          component: LoginPageComponent,
        },
      ],
      withEnabledBlockingInitialNavigation()
    ),
    provideAlarmsRootStore(),
    provideStoreDevtools(),
    provideAuthDomain(),
  ],
}).catch((err) => console.error(err));
