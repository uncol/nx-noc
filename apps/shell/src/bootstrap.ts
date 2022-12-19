import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withDebugTracing,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideAuthDomain } from '@auth-domain';
import {
  loadIcons,
  runInitAction,
  runInitEffect,
  updatePrefersColorScheme,
} from '@global-util';
import { endpoints } from '@global-variable';
import { provideEffects } from '@ngrx/effects';
import { Store, provideStore } from '@ngrx/store';

import { AppActions } from './app/actions';
import { AppComponent } from './app/app.component';
import { extModules, metaReducers } from './app/build-specifics';
import { AppEffects } from './app/effects/app.effects';
import { ROOT_REDUCERS } from './app/reducers';
import { SHELL_ROUTES } from './app/routes';

export const MANIFEST_INIT = runInitEffect((store: Store) => {
  return () => {
    store.dispatch(AppActions.loadManifest());
  };
});

export const LOAD_ICONS_ACTION = runInitAction(() => {
  return loadIcons;
});
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
    provideRouter(
      SHELL_ROUTES,
      withEnabledBlockingInitialNavigation(),
      withDebugTracing()
    ),
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
    provideEffects([AppEffects]),
    provideAuthDomain(),
    endpoints,
    extModules,
    MANIFEST_INIT,
    LOAD_ICONS_ACTION,
  ],
}).catch((err) => console.error(err));

updatePrefersColorScheme();
