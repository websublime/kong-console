export * from './adapter';
export * from './rest.adapter';

import { Adapter } from './adapter';
import { Http } from '@angular/http';
import { Injector } from '@angular/core';
import { RestAdapter } from './rest.adapter';

export const ADAPTER_PROVIDER: any[] = [
  { provide: Adapter, useClass: Adapter, deps: [Injector] },
  { provide: RestAdapter, useClass: RestAdapter, deps: [Http]}
];
