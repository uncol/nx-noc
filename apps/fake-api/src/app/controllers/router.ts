import { join } from 'path';

import { Credentials } from '@auth-domain';
import { router as jsonRouter } from 'json-server';

import { DATA_NAME, DATA_PATH } from '../config';

export const router = jsonRouter(join(DATA_PATH, DATA_NAME));

export function getUsers(credentials: Credentials) {
  return router.db.get('users').find<Credentials>(credentials).value() ?? null;
}
