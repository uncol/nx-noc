import { createReducer, on } from '@ngrx/store';
import { v4 as uuid_v4 } from 'uuid';

import { AppActions } from '../actions';
import { NOCAlert, NOCManifest } from '../model';

export const applicationFeatureKey = 'application';

export interface State {
  manifest: NOCManifest;
  alerts: NOCAlert[];
}

const initialState: State = {
  manifest: {},
  alerts: [
    {
      uuid: uuid_v4(),
      isAppLevel: true,
      message: 'This is a first app level alert.',
      type: 'success',
    },
  ],
};

export const reducer = createReducer(
  initialState,
  on(
    AppActions.loadManifestSuccess,
    (state: State, { manifest }): State => ({ ...state, manifest })
  ),
  on(
    AppActions.loadManifestFailure,
    (state: State, { error }): State => ({
      ...state,
      alerts: state.alerts.concat({
        uuid: uuid_v4(),
        message: error?.message || '',
        isAppLevel: true,
        type: 'danger',
      }),
    })
  ),
  on(
    AppActions.closeAppAlert,
    (state: State, { uuid }): State => ({
      ...state,
      alerts: state.alerts.filter((alert) => alert.uuid !== uuid),
    })
  )
);
