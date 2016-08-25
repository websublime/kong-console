import { AuthGuard } from '../shared';
import { App } from './app.container';
import { Login } from './login/login.container';
import { AdminContainer, HomeContainer } from './+admin';

/*import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { NoContent } from './no-content';*/

import { DataResolver } from './app.resolver';
import { RouterModule, Routes } from '@angular/router';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';
import { WebpackAsyncRoute, provideWebpack } from '@angularclass/webpack-toolkit';

export const ROUTES: Routes = [

  {
    path: '', children: [
      { path: '', component: Login },
      {
        path: 'admin',
        component: AdminContainer,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: HomeContainer }
        ]
      }
    ]
  },
  /*{ path: 'home',  component: Home },
  // make sure you match the component type string to the require in asyncRoutes
  { path: 'about', component: 'About',
    resolve: {
      'yourData': DataResolver
    }},
  // async components with children routes must use WebpackAsyncRoute
  { path: 'detail', component: 'Detail',
    canActivate: [ WebpackAsyncRoute ],
    children: [
      { path: '', component: 'Index' }  // must be included
    ]},
  { path: '**',    component: NoContent },*/
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly

const asyncRoutes: AsyncRoutes = {
  // we have to use the alternative syntax for es6-promise-loader to grab the routes
  //'About': require('es6-promise-loader!./about'),
  //'Detail': require('es6-promise-loader!./+detail'),
  //'Index': require('es6-promise-loader!./+detail'), // must be exported with detail/index.ts
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  // asyncRoutes['About'],
  // asyncRoutes['Detail'],
  // es6-promise-loader returns a function
];


// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings


export const ROUTING_PROVIDERS = [
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks)
];
