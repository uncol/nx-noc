import { loggedInGuard } from '@auth-domain';

import ROUTES from './routes';

// export default [{ ...ROUTES, canActivate: [loggedInGuard] }] as Route[];
export default ROUTES.map((route) => {
  return {
    ...route,
    // canActivate: [loggedInGuard],
  };
});
