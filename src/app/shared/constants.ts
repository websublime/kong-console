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
    APIS: {
      INDEX: string;
      NEW: string;
    }
  };
  ADAPTERS: {
    REST: string;
  };
  MODELS: {
    KONG: string;
    MENU: string;
  };
  TABLE: {
    ENTRIES: Array<number>;
  };
  [key: string]: any;
};

export interface PaginateModel {
  pages: number;
  page: number;
  size: number;
  limit: number;
  next: number;
  prev: number;
}

export const SYMBOLS: SymbolsInterface = <SymbolsInterface>{
  UI: 'ui',
  SIDEBAR: 'sidebar',
  HEADER: 'header',
  FOOTER: 'footer',
  USER: 'user',
  DATA: 'models',
  ROUTES: {
    LOGIN: '/',
    ADMIN: '/admin',
    APIS: {
      INDEX: '/admin/apis',
      NEW: '/admin/apis/new'
    }
  },
  ADAPTERS: {
    REST: 'REST'
  },
  MODELS: {
    KONG: 'kong.model',
    MENU: 'menu.model'
  },
  TABLE: {
    ENTRIES: [10, 25, 50, 100]
  }
};

export function makeSymbolPath(symbols: String[]): string {
  return symbols.join('.');
}

export function getLocalStorage(key?: string): any {
  return key ? STORE.get(key) : STORE.getAll();
}

export function nonConfigurable(target: Object, key: string) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false
  });
}

export function nonEnumerable(target: Object, key: string) {
  Object.defineProperty(target, key, {
    enumerable: false,
    configurable: true
  });
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
