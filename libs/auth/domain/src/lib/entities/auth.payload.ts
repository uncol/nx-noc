import { Credentials } from './credentials';

export type GrantType = 'password' | 'refresh_token';
export interface AuthPayload extends Credentials {
  grant_type: GrantType;
  visitorId: string;
}

export type TokenTypes = 'bearer';

export interface Tokens {
  access_token: string;
  token_type: TokenTypes;
  expires_in: number;
}
