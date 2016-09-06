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
