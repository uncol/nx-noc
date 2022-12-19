import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAuthDomain } from '@auth-domain';
import { LoginPageComponent } from '@auth-feature-login';
import { updatePrefersColorScheme } from '@global-util';
import { endpoints } from '@global-variable';
import { provideStore } from '@ngrx/store';

import { AppComponent } from './app/app.component';
import ROUTES from './app/routes.local';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuthDomain(),
    provideRouter([
      ...ROUTES,
      {
        path: 'login',
        title: 'Assets - Login',
        component: LoginPageComponent,
      },
    ]),
    provideStore(),
    endpoints,
  ],
}).catch((err) => console.error(err));

updatePrefersColorScheme();
