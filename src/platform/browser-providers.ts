/*
 * These are globally available services in any component or any other service
 */

// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { APP_RESOLVER_PROVIDERS } from '../app/containers/app.resolver';
// import { routes, asyncRoutes, prefetchRouteCallbacks } from '../app/containers/app.routes';

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),

  ...APP_RESOLVER_PROVIDERS,

  /*provideRouter(routes),
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks),
  ...HTTP_PROVIDERS,
  { provide: LocationStrategy, useClass: PathLocationStrategy }*/

  ...HTTP_PROVIDERS
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
