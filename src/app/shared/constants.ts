interface SymbolsInterface {
  UI: string;
  SIDEBAR: string;
  HEADER: string;
  FOOTER: string;
  USER: string;
  ROUTES: {
    LOGIN: string;
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
    LOGIN: '/login'
  }
};

export function makeSymbolPath(symbols: String[]): string {
  return symbols.join('.');
}
