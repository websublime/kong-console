// import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { CoreModule } from './shared';
import { ENV_PROVIDERS } from './environment';
import { AppContainer } from './app.container';
import { ContainerModule } from './containers';
import { State, InteralStateType } from './core';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  State
];

type StoreType = {
  state: InteralStateType,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppContainer ],
  declarations: [ AppContainer ],
  imports: [ // import Angular's modules
    BrowserModule,
    CoreModule.forRoot(),
    /*FormsModule,
    ReactiveFormsModule,
    HttpModule,*/
    RouterModule,
    ContainerModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: State) {
    console.log('--APP MODULE INITED--');
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appState._state = store.state;
    this.appRef.tick();
    delete store.state;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;

    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
