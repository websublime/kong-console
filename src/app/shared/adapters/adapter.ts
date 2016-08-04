import { SYMBOLS } from '../constants';
import { Observable } from 'rxjs/Observable';
import { RestAdapter } from './rest.adapter';
import { RequestOptionsArgs } from '@angular/http';
import { Configurator } from '../core/configurator';
import { Injectable, Injector } from '@angular/core';

const ADAPTER = 'ADAPTER';

export interface AdapterRestSignature {
  get(path: string, params?: RequestOptionsArgs): Observable<any>;
  post(path: string, params?: any, options?: RequestOptionsArgs): Observable<any>;
  put(path: string, params?: any, options?: RequestOptionsArgs): Observable<any>;
  delete(path: string, params?: RequestOptionsArgs): Observable<any>;
}

/**
 * Gets a driver for comunnication.
 *
 * @export
 * @class Adapter
 */
@Injectable()
export class Adapter {

  /**
   * Driver defined to use.
   *
   * @private
   * @type {*}
   */
  private _adapter: any;

  /**
   * Creates an instance of Adapter.
   *
   * @param {Injector} _injector
   */
  constructor(private _injector: Injector) {
    this._setupAdapter();
  }

  /**
   * Gets current adapter driver.
   *
   * @readonly
   */
  get adapter() {
    return this._adapter;
  }

  /**
   * Setup driver defined on Configurator
   * options.
   *
   * @private
   */
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
