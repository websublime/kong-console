export * from './constants';

export * from './core/monitor';
export * from './core/container';
export * from './core/descriptor';
export * from './core/persistence';
export * from './core/configurator';

export * from './directives/size.directive';

export * from './services/auth.guard';
export * from './services/apis.service';
export * from './services/auth.service';
export * from './services/state.service';
export * from './services/status.service';
export * from './services/consumers.service';

export * from './models/apis.model';
export * from './models/kong.model';
export * from './models/menu.model';
export * from './models/status.model';
export * from './models/consumers.model';

import { ADAPTER_PROVIDER } from './adapters';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';

export const AUTH_PROVIDERS = [
  AuthGuard,
  AuthService
];

export const DATA_PROVIDERS = [
  ADAPTER_PROVIDER
];
