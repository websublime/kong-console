import { Injectable, Injector } from '@angular/core';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { has, get } from 'lodash';
import { Observable } from 'rxjs/Observable';

import { Service } from './base.service';
import { Configurator } from '../../core/configurator';
import { RestAdapter } from '../adapters/rest.adapter';
import { SYMBOLS, getLocalStorage } from '../constants';
import { ConsumersModel } from '../models/consumers.model';

export interface ConsumerGetParameters {
  id?: string;
  custom_id?: string;
  username?: string;
  size?: string;
  offset?: string;
}

@Injectable()
export class ConsumerService extends Service<RestAdapter> {
  constructor(inject: Injector, private _configurator: Configurator) {
    super(inject);
  }

  consumers(args?: ConsumerGetParameters): Observable<ConsumersModel> {
    let baseUrl: string = this._configurator.getOption('API.URL');
    let reqOptions = this._reqOptions();

    let params: URLSearchParams = new URLSearchParams();
    /* tslint:disable */
    has(args, 'size') ? params.set('size', get(args, 'size', '10')) : params.set('size', '10');
    has(args, 'id') ? params.set('id', get(args, 'id', '')) : undefined;
    has(args, 'custom_id') ? params.set('custom_id', get(args, 'custom_id', '')) : undefined;
    has(args, 'username') ? params.set('username', get(args, 'username', '')) : undefined;
    has(args, 'offset') ? params.set('offset', get(args, 'offset', '')) : undefined;
    /* tslint:enable */
    reqOptions.search = params;

    return this.adapter.get(`${baseUrl}/consumers`, reqOptions)
      .flatMap((list) => {
        return Observable.of(new ConsumersModel(list.data));
      });
  }

  private _reqOptions(): RequestOptions {
    let localData: {key: string, user: string} = JSON.parse(getLocalStorage(SYMBOLS.USER));

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + localData.key);
    return new RequestOptions({ headers: headers, withCredentials: false });
  }
}
