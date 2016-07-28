import { Injectable } from '@angular/core';
import { BaseComponent } from './base.component';

@Injectable()
export abstract class BaseContainer extends BaseComponent {
  protected _props: any;

  constructor(props?: any, state?: any) {
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
