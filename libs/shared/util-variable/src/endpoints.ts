import { InjectionToken, Provider } from '@angular/core';

export const AUTH_API = new InjectionToken<string>('AUTH_API');
export const DATA_API = new InjectionToken<string[]>('DATA_API');
export const endpoints: Provider[] = [
  { provide: DATA_API, useValue: ['/api/data'] },
  { provide: AUTH_API, useValue: '/api/login' },
];
