export * from './adapter';
export * from './rest.adapter';

import { Adapter } from './adapter';
import { Http } from '@angular/http';
import { RestAdapter } from './rest.adapter';
import { provide, Injector } from '@angular/core';

export const ADAPTER_PROVIDER: any[] = [
  provide(Adapter, { useClass: Adapter, deps: [Injector] }),
  provide(RestAdapter, { useClass: RestAdapter, deps: [Http]})
];
