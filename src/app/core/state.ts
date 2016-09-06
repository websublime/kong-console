import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { set, get, has, cloneDeep } from 'lodash';

@Injectable()
export class State {
  _state = {};
  private _subject: Subject<any>;

  constructor() {
    this._state = {};

    this._subject = new Subject();
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
    let _state = set(this._state, prop, value);

    this._subject.next(_state);

    return _state;
  }

  _clone(object) {
    return cloneDeep(object);
  }

  has(prop?: string): boolean {
    return has(this._state, prop);
  }

  observe(): Observable<any> {
    return this._subject.asObservable();
  }
}
