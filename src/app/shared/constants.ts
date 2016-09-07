const STORE = require('store');

export const SYMBOLS = {
  ADAPTERS: {
    REST: 'REST'
  },
  USER: 'user',
  ROUTES: {
    LOGIN: '/login',
    ADMIN: '/admin'
  },
  UI: 'ui',
  SIDEBAR: 'sidebar',
  HEADER: 'header',
  FOOTER: 'footer'
};

export function makeSymbolPath(symbols: String[]): string {
  return symbols.join('.');
}

export function getLocalStorage(key?: string): any {
  return key ? STORE.get(key) : STORE.getAll();
}
