import { set, get, has } from 'lodash';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseComponent {
  protected _state: any = {};

  set state(value) {
    this._state = value;
  }

  get state() {
    return this._state;
  }

  set(key: string, value: any): any {
    return set(this._state, key, value);
  }

  get(key?: string): any {
    return get(this._state, key, this._state);
  }
}
