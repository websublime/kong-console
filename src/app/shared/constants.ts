const STORE = require('store');

interface SymbolsInterface {
  UI: string;
  SIDEBAR: string;
  HEADER: string;
  FOOTER: string;
  USER: string;
  DATA: string;
  ROUTES: {
    LOGIN: string;
    ADMIN: string;
  };
  ADAPTERS: {
    REST: string;
  };
  MODELS: {
    KONG: string;
    MENU: string;
  };
  [key: string]: any;
};

export const SYMBOLS: SymbolsInterface = <SymbolsInterface>{
  UI: 'ui',
  SIDEBAR: 'sidebar',
  HEADER: 'header',
  FOOTER: 'footer',
  USER: 'user',
  DATA: 'models',
  ROUTES: {
    LOGIN: '/',
    ADMIN: '/admin'
  },
  ADAPTERS: {
    REST: 'REST'
  },
  MODELS: {
    KONG: 'kong.model',
    MENU: 'menu.model'
  }
};

export function makeSymbolPath(symbols: String[]): string {
  return symbols.join('.');
}

export function getLocalStorage(key?: string): any {
  return key ? STORE.get(key) : STORE.getAll();
}
