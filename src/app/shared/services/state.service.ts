import { HmrState } from 'angular2-hmr';
import { Injectable } from '@angular/core';
import { set, get, has, cloneDeep } from 'lodash';

@Injectable()
export class State {
  // @HmrState() is used by HMR to track the state of any object during HMR (hot module replacement)
  @HmrState() _state = { };

  constructor() {
    this._state = {
      'ui': {
        'sidebar': false,
        'header': false,
        'footer': false
      }
    };
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }
  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    return get(this.state, prop, this.state);
  }

  set(prop: string, value: any) {
    return set(this._state, prop, value);
  }

  _clone(object) {
    return cloneDeep(object);
  }

  has(prop?: string): boolean {
    return has(this._state, prop);
  }
}
