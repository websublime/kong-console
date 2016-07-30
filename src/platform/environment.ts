
// Angular 2
// rc2 workaround
import { Configurator } from '../app/shared';
import { enableProdMode } from '@angular/core';
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';

// Environment Providers
let PROVIDERS = [
  // common env directives
];

const Config = new Configurator();

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateComponentRef = function identity(value) { return value; };

if ('production' === ENV) {
  // Production
  disableDebugTools();
  enableProdMode();

  Config.setOption('ENVIRONMENT', 'PROD');
  Config.setOption('API.URL', '');
  Config.setOption('API.ADMIN.URL', '');

  PROVIDERS = [
    ...PROVIDERS,
    {provide: Configurator, useValue: Config}
    // custom providers in production
  ];

} else {

  _decorateComponentRef = (cmpRef) => {
    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return cmpRef;
  };

  Config.setOption('ENVIRONMENT', 'DEV');
  Config.setOption('API.URL', 'http://192.168.99.100:8000');
  Config.setOption('API.ADMIN.URL', 'http://192.168.99.100:8001');

  // Development
  PROVIDERS = [
    ...PROVIDERS,
    {provide: Configurator, useValue: Config}
    // custom providers in development
  ];

}

export const decorateComponentRef = _decorateComponentRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
