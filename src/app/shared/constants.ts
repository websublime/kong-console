const STORE = require('store');

export const SYMBOLS = {
  ADAPTERS: {
    REST: 'REST'
  },
  USER: 'user',
  ROUTES: {
    LOGIN: '/login',
    ADMIN: '/admin',
    APIS: {
      INDEX: '/admin/apis',
      NEW: '/admin/apis/new'
    }
  },
  UI: 'ui',
  SIDEBAR: 'sidebar',
  HEADER: 'header',
  FOOTER: 'footer',
  TABLE: {
    ENTRIES: [10, 25, 50, 100]
  }
};

export interface PaginateModel {
  pages: number;
  page: number;
  size: number;
  limit: number;
  next: number;
  prev: number;
}

export function paginate(size: number, current: number = 1, limit: number = 10): PaginateModel {
  let pages = Math.ceil(size / limit);

  return <PaginateModel>{
    pages: pages,
    page: current,
    size: size,
    limit: limit,
    next: ((current + 1) <= pages) ? (current + 1) : 0,
    prev: ((current - 1) <= 0) ? 0 : (current - 1)
  };
}

export function makeSymbolPath(symbols: String[]): string {
  return symbols.join('.');
}

export function getLocalStorage(key?: string): any {
  return key ? STORE.get(key) : STORE.getAll();
}
