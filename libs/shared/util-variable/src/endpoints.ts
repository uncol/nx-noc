import { Provider } from '@angular/core';

export const endpoints: Provider[] = [
  { provide: 'DATA_API', useValue: ['/api/data'] },
  { provide: 'AUTH_API', useValue: '/api/login' },
];
