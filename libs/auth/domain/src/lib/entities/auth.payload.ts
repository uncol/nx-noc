import { Credentials } from './credentials';

export type GrantType = 'password' | 'refresh_token';
export interface AuthPayload extends Credentials {
  grant_type: GrantType;
  visitorId: string;
}
