import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { AppComponent } from './app/app.component';
import ROUTES from './app/routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(ROUTES, withEnabledBlockingInitialNavigation())],
}).catch((err) => console.error(err));
