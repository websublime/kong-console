interface SymbolsInterface {
  UI: string;
  SIDEBAR: string;
  HEADER: string;
  FOOTER: string;
  USER: string;
  ROUTES: {
    LOGIN: string;
    ADMIN: string;
  };
  ADAPTERS: {
    REST: string;
  };
  [key: string]: any;
};

export const SYMBOLS: SymbolsInterface = <SymbolsInterface>{
  UI: 'ui',
  SIDEBAR: 'sidebar',
  HEADER: 'header',
  FOOTER: 'footer',
  USER: 'user',
  ROUTES: {
    LOGIN: '/',
    ADMIN: '/admin'
  },
  ADAPTERS: {
    REST: 'REST'
  }
};

export function makeSymbolPath(symbols: String[]): string {
  return symbols.join('.');
}
