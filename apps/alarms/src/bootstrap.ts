import { provideAlarmsRootStore } from '@alarms-domain';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAuthDomain } from '@auth-domain';
import { LoginPageComponent } from '@auth-feature-login';
import { updatePrefersColorScheme } from '@global-util';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import ROUTES from './app/routes.local';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuthDomain(),
    provideRouter(
      [
        ...ROUTES,
        {
          path: 'login',
          title: 'Alarms - Login',
          component: LoginPageComponent,
        },
      ],
      withEnabledBlockingInitialNavigation()
    ),
    provideAlarmsRootStore(),
    provideStoreDevtools(),
  ],
}).catch((err) => console.error(err));

updatePrefersColorScheme();
