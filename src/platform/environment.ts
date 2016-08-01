// Angular 2
// rc2 workaround
import { Configurator, MonitorException } from '../app/shared';
import { enableProdMode, ExceptionHandler } from '@angular/core';
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';

// Environment Providers
let PROVIDERS = [
  // common providers
];

const CONFIG = new Configurator();

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateComponentRef = function identity(value) { return value; };

if ('production' === ENV) {
  // Production
  disableDebugTools();
  enableProdMode();

  CONFIG.setOption('ENVIRONMENT', 'PROD');
  CONFIG.setOption('API.URL', '');
  CONFIG.setOption('API.ADMIN.URL', '');

  PROVIDERS = [
    ...PROVIDERS,
    { provide: Configurator, useValue: CONFIG }
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

  CONFIG.setOption('ENVIRONMENT', 'DEV');
  CONFIG.setOption('API.URL', 'http://192.168.99.100:8000');
  CONFIG.setOption('API.ADMIN.URL', 'http://192.168.99.100:8001');

  // Development
  PROVIDERS = [
    ...PROVIDERS,
    { provide: Configurator, useValue: CONFIG }
    // custom providers in development
  ];

}

export const decorateComponentRef = _decorateComponentRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS,
  { provide: ExceptionHandler, useClass: MonitorException }
];
