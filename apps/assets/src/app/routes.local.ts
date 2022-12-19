import { Route } from '@angular/router';
import { loggedInGuard } from '@auth-domain';

import ROUTES from './routes';

export default [{ ...ROUTES[0], canActivate: [loggedInGuard] }] as Route[];
