import { has, get } from 'lodash';
import { Service } from './service';
import { Observable } from 'rxjs/Observable';
import { ApisModel } from '../models/apis.model';
import { Configurator } from '../core/configurator';
import { Injectable, Injector } from '@angular/core';
import { RestAdapter } from '../adapters/rest.adapter';
import { SYMBOLS, getLocalStorage } from '../constants';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

export interface ApiGetParameters {
  id?: string;
  name?: string;
  request_host?: string;
  request_path?: string;
  upstream_url?: string;
  size?: string;
  offset?: string;
}

@Injectable()
export class ApisService extends Service<RestAdapter> {
  constructor(inject: Injector, private _configurator: Configurator) {
    super(inject);
  }

  apis(args?: ApiGetParameters): Observable<ApisModel> {
    let baseUrl: string = this._configurator.getOption('API.URL');
    let reqOptions = this._reqOptions();

    let params: URLSearchParams = new URLSearchParams();
    /* tslint:disable */
    has(args, 'size') ? params.set('size', get(args, 'size', '10')) : params.set('size', '10');
    has(args, 'name') ? params.set('name', get(args, 'name', '')) : undefined;
    has(args, 'request_host') ? params.set('request_host', get(args, 'request_host', '')) : undefined;
    has(args, 'request_path') ? params.set('request_path', get(args, 'request_path', '')) : undefined;
    has(args, 'upstream_url') ? params.set('upstream_url', get(args, 'upstream_url', '')) : undefined;
    has(args, 'offset') ? params.set('offset', get(args, 'offset', '')) : undefined;
    /* tslint:enable */
    reqOptions.search = params;

    return this.adapter.get(`${baseUrl}/apis`, reqOptions)
      .flatMap((list) => {
        /*let collection = <ApisModelCollection>list.data;
        collection.data.forEach((api, index) => {
          collection.data[index] = new ApisModel(api);
        });*/

        return Observable.of(new ApisModel(list.data));
      });
  }

  private _reqOptions(): RequestOptions {
    let localData: {key: string, user: string} = JSON.parse(getLocalStorage(SYMBOLS.USER));

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + localData.key);
    return new RequestOptions({ headers: headers, withCredentials: false });
  }
}
