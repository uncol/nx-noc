import { APP_INITIALIZER, Provider } from '@angular/core';
import { Store } from '@ngrx/store';

export function runInitEffect(fn: (store: Store) => void): Provider {
  return {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: fn,
    deps: [Store],
  };
}

export function runInitAction(fn: () => void): Provider {
  return {
    multi: true,
    provide: APP_INITIALIZER,
    useFactory: fn,
  };
}
