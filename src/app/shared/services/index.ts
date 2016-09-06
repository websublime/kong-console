export * from './auth.service';
export * from './base.service';
export * from './guard.service';

import { Injector } from '@angular/core';
import { AuthService } from './auth.service';

export const AUTH_PROVIDER: any[] = [
  { provide: AuthService, useClass: AuthService, deps: [Injector] },
];
