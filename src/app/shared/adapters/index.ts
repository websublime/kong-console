export * from './adapter';

import { Provider, Injector } from '@angular/core';
import { Adapter } from './adapter';

export const ADAPTER_PROVIDER: any[] = [
  new Provider(Adapter, { useClass: Adapter, deps: [Injector] })
];
