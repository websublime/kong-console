import { Service } from './service';
import { Observable } from 'rxjs/Observable';
import { Configurator } from '../core/configurator';
import { StatusModel } from '../models/status.model';
import { Injectable, Injector } from '@angular/core';
import { RestAdapter } from '../adapters/rest.adapter';
import { Headers, RequestOptions } from '@angular/http';
import { SYMBOLS, getLocalStorage } from '../constants';

@Injectable()
export class StatusService extends Service<RestAdapter> {
  constructor(inject: Injector, private _configurator: Configurator) {
    super(inject);
  }

  status(): Observable<StatusModel> {
    let baseUrl: string = this._configurator.getOption('API.URL');
    let localData: {key: string, user: string} = JSON.parse(getLocalStorage(SYMBOLS.USER));

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + localData.key);
    // headers.append('Content-Type', 'application/json');
    let reqOptions = new RequestOptions({ headers: headers, withCredentials: false });

    return this.adapter.get(`${baseUrl}/status`, reqOptions)
      .flatMap((response) => {
        return Observable.of(new StatusModel(response.data));
      });
  }
}
