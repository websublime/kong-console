export * from './auth.service';
export * from './base.service';

import { Injector } from '@angular/core';
import { AuthService } from './auth.service';

export const AUTH_PROVIDER: any[] = [
  { provide: AuthService, useClass: AuthService, deps: [Injector] }
];
