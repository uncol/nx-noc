import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Provider, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAuthDomain } from '@auth-domain';
import { provideEffects } from '@ngrx/effects';
import { Store, provideStore } from '@ngrx/store';

import { AppActions } from './app/actions';
import { AppComponent } from './app/app.component';
import { extModules, metaReducers } from './app/build-specifics';
import { AppEffects } from './app/effects/app.effects';
import { ROOT_REDUCERS } from './app/reducers';
import { SHELL_ROUTES } from './app/routes';

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
    { provide: 'AUTH_API', useValue: '/api/login' },
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    MANIFEST_INIT,
    provideHttpClient(),
    provideRouter(SHELL_ROUTES, withEnabledBlockingInitialNavigation()),
    provideStore(ROOT_REDUCERS, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    // provideState(authFeature),
    provideEffects([AppEffects]),
    provideAuthDomain(),
    extModules,
  ],
}).catch((err) => console.error(err));
