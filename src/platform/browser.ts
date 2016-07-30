export * from './browser-pipes';
export * from './browser-providers';
export * from './browser-directives';

import { PIPES } from './browser-pipes';
import { PROVIDERS } from './browser-providers';
import { DIRECTIVES } from './browser-directives';

export const PLATFORM_PROVIDERS = [
  ...PROVIDERS,
  ...DIRECTIVES,
  ...PIPES
];
