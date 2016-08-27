import { has, get } from 'lodash';
import { Service } from './service';
import { Observable } from 'rxjs/Observable';
import { ApisModel } from '../models/apis.model';
import { Configurator } from '../core/configurator';
import { Injectable, Injector } from '@angular/core';
import { RestAdapter } from '../adapters/rest.adapter';
import { SYMBOLS, getLocalStorage } from '../constants';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class ConsumerService extends Service<RestAdapter> {
  constructor(inject: Injector, private _configurator: Configurator) {
    super(inject);
  }
}
