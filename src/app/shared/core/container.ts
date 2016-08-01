import { Injectable } from '@angular/core';
import { Descriptor } from './descriptor';

@Injectable()
export abstract class Container extends Descriptor {

  constructor() {
    super();
  }

  changeDetection(fn: Function, args?: Array<any>, context?: Object): void {
    setTimeout(
      () => {
        let params: Array<any> = args ? args : [];
        let self: Object = context ? context : this;
        fn.apply(self, params);
      },
      5
    );
  }
}
