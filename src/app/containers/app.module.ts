import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MonitorException, Persistence } from '../shared';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { NgModule, ExceptionHandler, ApplicationRef } from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from '../environment';
import { ROUTES } from './app.routes';

// App is our top level component
import { App } from './app.container';
import { Login } from './login/login.container';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { State, AUTH_PROVIDERS, DATA_PROVIDERS } from '../shared';
import {
  AdminContainer, HomeContainer, ApisContainer, NewApiContainer
} from './+admin';

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
    App, Login, HomeContainer, AdminContainer,
    ApisContainer, NewApiContainer
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    { provide: ExceptionHandler, useClass: MonitorException },
    { provide: Persistence, useClass: Persistence }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: State) {}
  hmrOnInit(store) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appState._state = store.state;
    this.appRef.tick();
    delete store.state;
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    let state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
