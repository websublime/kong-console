export const SYMBOLS = {
  ADAPTERS: {
    REST: 'REST'
  },
  USER: 'user'
};

export function makeSymbolPath(symbols: String[]): string {
  return symbols.join('.');
}
