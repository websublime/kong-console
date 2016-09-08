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
    },
    CONSUMER: {
      INDEX: '/admin/consumers',
      NEW: '/admin/consumers/new'
    }
  },
  UI: 'ui',
  SIDEBAR: 'sidebar',
  HEADER: 'header',
  FOOTER: 'footer',
  TABLE: {
    ENTRIES: [10, 25, 50, 100]
  },
  PLUGINS: [
    {id: 'ssl', img: 'dynamic-ssl.png'},
    {id: 'jwt', img: 'jwt.png'},
    {id: 'acl', img: 'acl.png'},
    {id: 'correlation-id', img: 'correlation-id.png'},
    {id: 'cors', img: 'cors.png'},
    {id: 'oauth2', img: 'oauth2-authentication.png'},
    {id: 'tcp-log', img: 'tcp-log.png'},
    {id: 'udp-log', img: 'udp-log.png'},
    {id: 'file-log', img: 'file-log.png'},
    {id: 'http-log', img: 'http-log.png'},
    {id: 'key-auth', img: 'key-authentication.png'},
    {id: 'hmac-auth', img: 'hmac-authentication.png'},
    {id: 'basic-auth', img: 'basic-authentication.png'},
    {id: 'ip-restriction', img: 'ip-restriction.png'},
    {id: 'galileo', img: 'galileo.png'},
    {id: 'request-transformer', img: 'request-transformer.png'},
    {id: 'response-transformer', img: 'response-transformer.png'},
    {id: 'request-size-limiting', img: 'request-size-limiting.png'},
    {id: 'rate-limiting', img: 'rate-limiting.png'},
    {id: 'response-ratelimiting', img: 'response-rate-limiting.png'},
    {id: 'syslog', img: 'syslog.png'},
    {id: 'loggly', img: 'loggly.png'},
    {id: 'datadog', img: 'datadog.png'},
    {id: 'runscope', img: 'runscope.png'},
    {id: 'ldap-auth', img: 'ldap-authentication.png'},
    {id: 'statsd', img: 'statsd.png'}
  ]
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

export function uuid() {
  let lut = [];

  for (let i = 0; i < 256; i++) {
    lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
  }
  /* tslint:disable */
  let rdOne = Math.random() * 0xffffffff | 0;
  let rdTwo = Math.random() * 0xffffffff | 0;
  let rdThree = Math.random() * 0xffffffff | 0;
  let rdFour = Math.random() * 0xffffffff | 0;

  return lut[rdOne & 0xff] + lut[rdOne >> 8 & 0xff] +
    lut[rdOne >> 16 & 0xff] + lut[rdOne >> 24 & 0xff] + '-' +
    lut[rdTwo & 0xff] + lut[rdTwo >> 8 & 0xff] + '-' +
    lut[rdTwo >> 16 & 0x0f | 0x40] + lut[rdTwo >> 24 & 0xff] + '-' +
    lut[rdThree & 0x3f | 0x80] + lut[rdThree >> 8 & 0xff] + '-' +
    lut[rdThree >> 16 & 0xff] + lut[rdThree >> 24 & 0xff] +
    lut[rdFour & 0xff] + lut[rdFour >> 8 & 0xff] +
    lut[rdFour >> 16 & 0xff] + lut[rdFour >> 24 & 0xff];
  /* tslint:enable */
}
