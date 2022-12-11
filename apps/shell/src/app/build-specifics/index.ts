import { ActionReducer, MetaReducer } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { State } from '../reducers';

export const extModules = [
  provideStoreDevtools({
    maxAge: 25,
    name: 'NOC Store App',
  }),
];

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];
