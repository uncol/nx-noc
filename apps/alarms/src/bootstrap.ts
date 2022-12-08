import { provideAlarmsDomain } from '@alarms-domain';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideStore(),
    provideEffects([]),
    provideStoreDevtools(),
    provideAlarmsDomain(),
  ],
}).catch((err) => console.error(err));
