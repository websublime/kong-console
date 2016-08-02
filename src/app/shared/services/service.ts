import { Adapter } from '../adapters';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export abstract class Service {
  adapter: any;

  constructor(private _injector: Injector) {
    /*let reflectiveInjector: ReflectiveInjector = <ReflectiveInjector>injector;
    console.log(injector, reflectiveInjector);
    let other = reflectiveInjector.resolveAndInstantiate(OtherDependency);*/
    this._initAdapter();
    console.log(this.adapter);
  }

  private _initAdapter(): void {
    let adapterProvider: Adapter = this._injector.get(Adapter);

    this.adapter = adapterProvider.adapter;
  }
}
