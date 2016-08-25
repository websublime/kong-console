import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MonitorException, Persistence } from '../shared';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ExceptionHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES, ROUTING_PROVIDERS } from './app.routes';
import { ENV_PROVIDERS } from '../../platform/environment';
import { PLATFORM_PROVIDERS } from '../../platform/browser';

// App is our top level component
import { App } from './app.container';
import { Login } from './login/login.container';
import { AdminContainer, HomeContainer } from './+admin';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { State, AUTH_PROVIDERS, DATA_PROVIDERS } from '../shared';

// export * from './containers';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  State,
  AUTH_PROVIDERS,
  DATA_PROVIDERS
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App, Login, HomeContainer, AdminContainer
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    PLATFORM_PROVIDERS,
    ENV_PROVIDERS,
    ROUTING_PROVIDERS,
    APP_PROVIDERS,
    { provide: ExceptionHandler, useClass: MonitorException },
    { provide: Persistence, useClass: Persistence }
  ]
})
export class AppModule {
}
