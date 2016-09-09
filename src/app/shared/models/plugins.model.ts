import { has, isObject } from 'lodash';
import { Injectable } from '@angular/core';
import { BaseModel, BaseModelCollection } from './base.model';

/* tslint:disable */
export const PLUGINSDATA = [
  { id: 'ssl', img: 'dynamic-ssl.png', title: 'Dynamic SSL', info: 'Add an SS certificate for an underlying service.' },
  { id: 'jwt', img: 'jwt.png', title: 'JWT', info: 'Verify and authenticate JSON Web Tokens.' },
  { id: 'acl', img: 'acl.png', title: 'ACL', info: 'Control which consumers can access APIs.' },
  { id: 'correlation-id', img: 'correlation-id.png', title: 'Correlation ID', info: 'Correlate requests and responses using a unique ID.' },
  { id: 'cors', img: 'cors.png', title: 'CORS', info: 'Allow developers to make requests from the browser.' },
  { id: 'oauth2', img: 'oauth2-authentication.png', title: 'OAuth 2.0', info: 'Add an OAuth 2.0 authentication to yor APIs.' },
  { id: 'tcp-log', img: 'tcp-log.png', title: 'TCP', info: 'Send request and response logs to a TCP server.' },
  { id: 'udp-log', img: 'udp-log.png', title: 'UDP', info: 'Send request and response logs to an UDP server.' },
  { id: 'file-log', img: 'file-log.png', title: 'File', info: 'Append request and response data to a log file on disk.' },
  { id: 'http-log', img: 'http-log.png', title: 'HTTP', info: 'Send request and response logs to an HTTP server.' },
  { id: 'key-auth', img: 'key-authentication.png', title: 'Key Authentication', info: 'Add a key authentication to your APIs.' },
  { id: 'hmac-auth', img: 'hmac-authentication.png', title: 'HMAC', info: 'Add HMAC authentication to your APIs.' },
  { id: 'basic-auth', img: 'basic-authentication.png', title: 'Basic Authentication', info: 'Add basic authentication to your APIs.' },
  { id: 'ip-restriction', img: 'ip-restriction.png', title: 'IP Restriction', info: 'Whitelist or blacklist IPs that can make requests.' },
  { id: 'galileo', img: 'galileo.png', title: 'Galileo', info: 'Business intelligence platform for APIs.' },
  { id: 'request-transformer', img: 'request-transformer.png', title: 'Request Transformer', info: 'Modify the request before hitting the upstream server.' },
  { id: 'response-transformer', img: 'response-transformer.png', title: 'Response Transformer', info: 'Modify the upstream response before returning it to client.' },
  { id: 'request-size-limiting', img: 'request-size-limiting.png', title: 'Request Size Limiting', 'info': 'Block requests with bodies greater than a specific size.' },
  { id: 'rate-limiting', img: 'rate-limiting.png', title: 'Rate Limiting', info: 'Rate limit how many HTTP requests a developer can make.' },
  { id: 'response-ratelimiting', img: 'response-rate-limiting.png', title: 'Response Rate Limiting', info: 'Rate limiting based on a custom response header value.' },
  { id: 'syslog', img: 'syslog.png', title: 'Syslog', info: 'Send request and response logs to Syslog.' },
  { id: 'loggly', img: 'loggly.png', title: 'Loggly', info: 'Send request and response logs to Loggly.' },
  { id: 'datadog', img: 'datadog.png', title: 'Datadog', info: 'Visualize API metrics on Datadog.' },
  { id: 'runscope', img: 'runscope.png', title: 'Runscope', info: 'API performance testing and monitoring.' },
  { id: 'ldap-auth', img: 'ldap-authentication.png', title: 'LDAP', info: 'Integrate Kong with a LDAP server.' },
  { id: 'statsd', img: 'statsd.png', title: 'StatsD', info: 'Send request and response logs to StatsD.' }
];
/* tslint:enable */

export interface SchemaModelResource {
  no_consumer?: boolean;
  fields?: Object;
}

@Injectable()
export class SchemaModel extends BaseModel {
  /* tslint:disable */
  no_consumer?: boolean;
  fields?: Object;
  /* tslint:enable */
  collection?: BaseModelCollection<SchemaModelResource>;

  constructor(data?: SchemaModelResource | BaseModelCollection<SchemaModelResource>) {
    super();

    if (has(data, 'data')) {
      this._setCollection(<BaseModelCollection<SchemaModelResource>>data);
    } else if (isObject(data)) {
      Object.assign(this, data);
    }
  }

  private _setCollection(collection: BaseModelCollection<SchemaModelResource>) {
    collection.data.forEach((value, index) => {
      collection.data[index] = new SchemaModel(<SchemaModelResource>value);
    });

    this.collection = collection;
  }
}
