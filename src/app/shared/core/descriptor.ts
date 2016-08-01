import { set, get, has } from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export abstract class Descriptor {
  private _state: any = {};
  private _props: any = {};
  private _emitter: EventEmitter<any>;

  constructor() {
    this._emitter = new EventEmitter();
  }

  set state(value) {
    this._state = value;
    this._emitter.emit({ state: value });
  }

  get state() {
    return this._state;
  }

  observe(): Observable<any> {
    return this._emitter.asObservable();
  }

  event(): EventEmitter<any> {
    return this._emitter;
  }

  setProp(key: string, value: any): void {
    set(this._props, key, value);
    this._emitter.emit({ props: this._props });
  }

  getProp(key?: string): any {
    return get(this._props, key, this._props);
  }

  resetProps(): void {
    this._props = {};
  }
}
