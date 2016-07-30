export * from './constants';
export * from './container';
export * from './descriptor';
export * from './configurator';
export * from './services/auth.guard';
export * from './services/auth.service';
export * from './services/state.service';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

export const AUTH_PROVIDERS = [
  AuthGuard,
  AuthService
];
