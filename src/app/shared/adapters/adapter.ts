import { Injectable, Injector } from '@angular/core';

@Injectable()
export class Adapter {
  constructor(private _injector: Injector) {
    console.log(this._injector)
  }
}
