import * as fromApplication from './application.reducer';

export interface State {
  [fromApplication.applicationFeatureKey]: fromApplication.State;
}

export const ROOT_REDUCERS = {
  [fromApplication.applicationFeatureKey]: fromApplication.reducer,
};
