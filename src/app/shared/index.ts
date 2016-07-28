export * from './constants';
export * from './base.container';
export * from './base.component';
export * from './services/auth.guard';
export * from './services/auth.service';
export * from './services/state.service';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

export const AUTH_PROVIDERS = [
  AuthGuard,
  AuthService
];
