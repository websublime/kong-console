export * from './constants';
export * from './core/monitor';
export * from './core/container';
export * from './core/descriptor';
export * from './core/configurator';
export * from './services/auth.guard';
export * from './services/auth.service';
export * from './services/state.service';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

export const AUTH_PROVIDERS = [
  AuthGuard,
  AuthService
];
