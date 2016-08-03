import { SYMBOLS } from '../constants';
import { Observable } from 'rxjs/Observable';
import { RestAdapter } from './rest.adapter';
import { RequestOptionsArgs } from '@angular/http';
import { Configurator } from '../core/configurator';
import { Injectable, Injector } from '@angular/core';

const ADAPTER = 'ADAPTER';

export interface AdapterSignature {
  get(path: string, params?: RequestOptionsArgs): Observable<any>;
  post(path: string, params?: any): Observable<any>;
  put(path: string, params?: any): Observable<any>;
  delete(path: string, params?: any): Observable<any>;
}

@Injectable()
export class Adapter {
  private _adapter: any;

  constructor(private _injector: Injector) {
    this._setupAdapter();
  }

  get adapter() {
    return this._adapter;
  }

  private _setupAdapter(): void {
    let configurator: Configurator = this._injector.get(Configurator);
    let adapterType: string = configurator.getOption(ADAPTER, SYMBOLS.ADAPTERS.REST);

    switch (adapterType) {
      default:
        this._adapter = this._injector.get(RestAdapter);
        break;
    }
  }
}
