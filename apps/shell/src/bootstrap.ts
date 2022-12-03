import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Provider, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { Store, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppActions } from './app/actions';
import { AppComponent } from './app/app.component';
import { AppEffects } from './app/effects/app.effects';
import { ROOT_REDUCERS } from './app/reducers';
import { SHELL_ROUTES } from './app/shell.routes';

export function runInitEffect(fn: (store: Store) => void): Provider {
  return {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: fn,
    deps: [Store],
  };
}
export const MANIFEST_INIT = runInitEffect((store: Store) => {
  return () => {
    store.dispatch(AppActions.loadManifest());
  };
});
bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'DATA_API', useValue: ['/api/data'] },
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    MANIFEST_INIT,
    provideHttpClient(),
    provideRouter(SHELL_ROUTES, withEnabledBlockingInitialNavigation()),
    provideStore(ROOT_REDUCERS, {
      metaReducers: [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    provideEffects([AppEffects]),
    provideStoreDevtools({
      maxAge: 25,
      name: 'NOC Store App',
    }),
  ],
}).catch((err) => console.error(err));
